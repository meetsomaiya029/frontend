'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
  ],
};

export default function ChatPage() {
  const [user, setUser] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  // WebRTC State
  const [isInCall, setIsInCall] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [remoteUserName, setRemoteUserName] = useState<string>('Remote Peer');
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const iceCandidatesQueueRef = useRef<RTCIceCandidateInit[]>([]);

  // Media Controls State
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  // Process queued ICE candidates safety function
  const processIceQueue = async (pc: RTCPeerConnection) => {
    while (iceCandidatesQueueRef.current.length > 0) {
      const candidate = iceCandidatesQueueRef.current.shift();
      if (candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error('Error adding queued ICE candidate:', e);
        }
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (!token || !storedUser) {
      router.push('/');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const newSocket = io('http://localhost:3001', { auth: { token } });
    setSocket(newSocket);

    fetchRooms();

    newSocket.on('receive_message', (message: any) => {
      setMessages((prev) => [...prev, message]);
    });

    // WebRTC Signaling Listeners
    newSocket.on('webrtc_offer', async ({ offer, senderName }) => {
      if (senderName) {
        setRemoteUserName(senderName);
      }
      await handleIncomingOffer(offer, newSocket);
    });

    newSocket.on('webrtc_answer', async ({ answer, senderName }) => {
      if (senderName) {
        setRemoteUserName(senderName);
      }
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
        await processIceQueue(peerConnectionRef.current);
      }
    });

    newSocket.on('webrtc_ice_candidate', async ({ candidate }) => {
      const pc = peerConnectionRef.current;
      if (pc && pc.remoteDescription && pc.remoteDescription.type) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.error('Error adding ICE candidate directly:', e);
        }
      } else {
        iceCandidatesQueueRef.current.push(candidate);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Sync local media stream whenever video DOM element mounts
  useEffect(() => {
    if (isInCall && localStreamRef.current && localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
  }, [isInCall]);

  // Sync remote media stream and handle play interrupts safely
  useEffect(() => {
    if (isInCall && remoteStream && remoteVideoRef.current) {
      const videoElement = remoteVideoRef.current;
      if (videoElement.srcObject !== remoteStream) {
        videoElement.srcObject = remoteStream;
      }
      
      const playPromise = videoElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== 'AbortError') {
            console.error('Error auto-playing remote video:', err);
          }
        });
      }
    }
  }, [isInCall, remoteStream]);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/chat/rooms', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRooms(data);
      }
    } catch (err) {
      console.error('Failed to fetch rooms', err);
    }
  };

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3001/api/chat/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newRoomName, userId: user?.id }),
      });

      if (res.ok) {
        setNewRoomName('');
        fetchRooms();
      }
    } catch (err) {
      console.error('Error creating room', err);
    }
  };

  const fetchRoomMessages = async (roomId: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/chat/rooms/${roomId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        const formatted = data.map((msg: any) => ({
          ...msg,
          userName: msg.userName || msg.user?.name || 'User',
        }));
        setMessages(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch messages', err);
    }
  };

  const joinRoom = (room: any) => {
    setCurrentRoom(room);
    setMessages([]);
    fetchRoomMessages(room.id);
    socket?.emit('join_room', { roomId: room.id });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!newMessage.trim() && !selectedFile) || !currentRoom) return;

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        socket?.emit('send_message', {
          roomId: currentRoom.id,
          content: newMessage || `Sent file: ${selectedFile.name}`,
          file: {
            name: selectedFile.name,
            type: selectedFile.type,
            base64: reader.result as string,
          },
          userId: user.id,
          userName: user.name,
        });

        setSelectedFile(null);
        setNewMessage('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(selectedFile);
    } else {
      socket?.emit('send_message', {
        roomId: currentRoom.id,
        content: newMessage,
        userId: user.id,
        userName: user.name,
      });

      setNewMessage('');
    }
  };

  // --- WEBRTC & MEDIA CONTROL METHODS ---

  const toggleAudio = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  const initPeerConnection = (activeSocket: Socket) => {
    const pc = new RTCPeerConnection(ICE_SERVERS);

    pc.onicecandidate = (event) => {
      if (event.candidate && currentRoom) {
        activeSocket.emit('webrtc_ice_candidate', {
          roomId: currentRoom.id,
          candidate: event.candidate,
          senderId: user?.id,
        });
      }
    };

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    peerConnectionRef.current = pc;
    return pc;
  };

  const startCall = async () => {
    if (!socket || !currentRoom) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;

      setIsInCall(true);

      const pc = initPeerConnection(socket);
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit('webrtc_offer', {
        roomId: currentRoom.id,
        offer,
        senderId: user?.id,
        senderName: user?.name,
      });
    } catch (err) {
      console.error('Failed to access media devices', err);
    }
  };

  const handleIncomingOffer = async (offer: any, activeSocket: Socket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;

      setIsInCall(true);

      const pc = initPeerConnection(activeSocket);
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      await processIceQueue(pc);

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      activeSocket.emit('webrtc_answer', {
        roomId: currentRoom?.id,
        answer,
        senderId: user?.id,
        senderName: user?.name,
      });
    } catch (err) {
      console.error('Error answering WebRTC offer', err);
    }
  };

  const endCall = () => {
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;
    iceCandidatesQueueRef.current = [];
    setRemoteStream(null);
    setRemoteUserName('Remote Peer');
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar - Rooms */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 flex flex-col p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Chat Rooms</h2>
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/');
            }}
            className="text-xs bg-red-600 px-2 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <form onSubmit={createRoom} className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="New room name..."
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="w-full p-2 text-sm bg-gray-700 border border-gray-600 rounded focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 px-3 py-2 text-sm rounded font-bold hover:bg-blue-700">
            +
          </button>
        </form>

        <div className="flex-1 overflow-y-auto space-y-2">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => joinRoom(room)}
              className={`p-3 rounded cursor-pointer transition ${
                currentRoom?.id === room.id ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <p className="font-semibold">{room.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {currentRoom ? (
          <>
            <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold"># {currentRoom.name}</h3>

              <div className="flex gap-2 items-center">
                {isInCall && (
                  <>
                    <button
                      onClick={toggleAudio}
                      className={`px-3 py-2 rounded text-xs font-semibold ${
                        isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {isMuted ? 'Unmute Mic' : 'Mute Mic'}
                    </button>
                    <button
                      onClick={toggleVideo}
                      className={`px-3 py-2 rounded text-xs font-semibold ${
                        isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {isVideoOff ? 'Camera Off' : 'Camera On'}
                    </button>
                  </>
                )}

                {!isInCall ? (
                  <button
                    onClick={startCall}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm font-semibold transition"
                  >
                    Start Video Call
                  </button>
                ) : (
                  <button
                    onClick={endCall}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm font-semibold transition"
                  >
                    End Call
                  </button>
                )}
              </div>
            </div>

            {/* Video Call Viewports */}
            {isInCall && (
              <div className="p-4 bg-black border-b border-gray-700 grid grid-cols-2 gap-4 h-64">
                <div className="relative bg-gray-800 rounded overflow-hidden">
                  <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 text-xs rounded">You</span>
                </div>
                <div className="relative bg-gray-800 rounded overflow-hidden">
                  <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 text-xs rounded">
                    {remoteUserName}
                  </span>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${msg.userId === user?.id ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-xs text-gray-400 mb-1">{msg.userName || 'User'}</span>
                  <div
                    className={`p-3 rounded-lg max-w-md ${
                      msg.userId === user?.id ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-200'
                    }`}
                  >
                    {msg.content}
                    {msg.file?.base64 && (
                      <div className="mt-2">
                        {msg.file.type?.startsWith('image/') ? (
                          <img src={msg.file.base64} alt={msg.file.name} className="max-w-xs rounded" />
                        ) : (
                          <a
                            href={msg.file.base64}
                            download={msg.file.name}
                            className="underline text-xs text-blue-200 block"
                          >
                            📎 Download {msg.file.name}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar with File Attachment Button */}
            <form onSubmit={sendMessage} className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2 items-center">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-3 rounded text-sm"
              >
                📎
              </button>

              {selectedFile && (
                <span className="text-xs bg-gray-700 px-2 py-1 rounded max-w-[120px] truncate">
                  {selectedFile.name}
                </span>
              )}

              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
              />
              <button type="submit" className="bg-blue-600 px-6 py-3 rounded font-bold hover:bg-blue-700">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select or create a chat room to start messaging
          </div>
        )}
      </div>
    </div>
  );
}