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
  const [roomMembers, setRoomMembers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  // Mobile Viewport Drawer States
  const [showMobileRooms, setShowMobileRooms] = useState(true);
  const [showMobileMembers, setShowMobileMembers] = useState(false);

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

    newSocket.on('room_users', (users: any[]) => {
      setRoomMembers(users);
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

        while (iceCandidatesQueueRef.current.length > 0) {
          const candidate = iceCandidatesQueueRef.current.shift();
          if (candidate) {
            await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
          }
        }
      }
    });

    newSocket.on('webrtc_ice_candidate', async ({ candidate }) => {
      if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
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

  // Sync remote media stream whenever video DOM element mounts or stream updates
  useEffect(() => {
    if (isInCall && remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
      remoteVideoRef.current
        .play()
        .catch((err) => console.error('Error auto-playing remote video:', err));
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
    setShowMobileRooms(false);
    setShowMobileMembers(false);
    fetchRoomMessages(room.id);
    socket?.emit('join_room', {
      roomId: room.id,
      userId: user?.id,
      userName: user?.name,
    });
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
          senderId: user.id,
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
        senderId: user.id,
        senderName: user.name,
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

      while (iceCandidatesQueueRef.current.length > 0) {
        const candidate = iceCandidatesQueueRef.current.shift();
        if (candidate) {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        }
      }

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
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar - Rooms (Drawer on Mobile, Fixed on Desktop) */}
      <div
        className={`${
          showMobileRooms ? 'flex' : 'hidden'
        } md:flex flex-col w-full md:w-1/4 h-full bg-slate-900 border-r border-slate-800 p-4 z-20 shrink-0`}
      >
        {/* Plus UAE Branding */}
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
            <div>
              <h1 className="text-base font-extrabold tracking-wider text-amber-400 uppercase">
                PLUS UAE
              </h1>
              <p className="text-[10px] text-slate-400 tracking-widest uppercase">
                Enterprise Workspace
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/');
            }}
            className="text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white transition"
          >
            Logout
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Chat Rooms
          </h2>
          <form onSubmit={createRoom} className="flex gap-2">
            <input
              type="text"
              placeholder="New channel name..."
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              className="w-full p-2.5 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500/50 transition text-slate-200 placeholder-slate-500"
            />
            <button
              type="submit"
              className="bg-amber-500 text-slate-950 px-4 py-2.5 text-sm rounded-lg font-bold hover:bg-amber-400 transition"
            >
              +
            </button>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
          {rooms.map((room) => (
            <div
              key={room.id}
              onClick={() => joinRoom(room)}
              className={`p-3 rounded-lg cursor-pointer transition flex items-center justify-between ${
                currentRoom?.id === room.id
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold'
                  : 'bg-slate-800/60 border border-transparent hover:bg-slate-800 text-slate-300'
              }`}
            >
              <p className="truncate text-sm"># {room.name}</p>
              {currentRoom?.id === room.id && (
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Container Area */}
      <div
        className={`${
          !showMobileRooms ? 'flex' : 'hidden'
        } md:flex flex-1 h-full w-full bg-slate-950 overflow-hidden relative`}
      >
        {currentRoom ? (
          <div className="flex flex-1 h-full w-full overflow-hidden">
            {/* Middle Section: Chat + Video Viewports */}
            <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-slate-800">
              {/* Header */}
              <div className="p-3 md:p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={() => setShowMobileRooms(true)}
                    className="md:hidden bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300"
                  >
                    ← Channels
                  </button>
                  <h3 className="text-base md:text-lg font-bold text-slate-100 truncate">
                    # {currentRoom.name}
                  </h3>
                </div>

                <div className="flex gap-2 items-center shrink-0">
                  {/* Mobile Members Drawer Toggle Button */}
                  <button
                    onClick={() => setShowMobileMembers(!showMobileMembers)}
                    className="lg:hidden bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300"
                  >
                    👥 ({roomMembers.length})
                  </button>

                  {isInCall && (
                    <>
                      <button
                        onClick={toggleAudio}
                        className={`px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold transition ${
                          isMuted
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-800 border border-slate-700 text-slate-200'
                        }`}
                      >
                        {isMuted ? 'Unmute' : 'Mute'}
                      </button>
                      <button
                        onClick={toggleVideo}
                        className={`px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold transition ${
                          isVideoOff
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-800 border border-slate-700 text-slate-200'
                        }`}
                      >
                        {isVideoOff ? 'Cam Off' : 'Cam On'}
                      </button>
                    </>
                  )}

                  {!isInCall ? (
                    <button
                      onClick={startCall}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition shadow-lg shadow-emerald-950/50"
                    >
                      Start Call
                    </button>
                  ) : (
                    <button
                      onClick={endCall}
                      className="bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition shadow-lg shadow-red-950/50"
                    >
                      End Call
                    </button>
                  )}
                </div>
              </div>

              {/* Video Call Viewports */}
              {isInCall && (
                <div className="p-3 bg-black border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 h-60 sm:h-64 shrink-0">
                  <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-slate-950/80 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold rounded">
                      You
                    </span>
                  </div>
                  <div className="relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-slate-950/80 text-slate-200 border border-slate-700 px-2 py-0.5 text-[10px] font-semibold rounded truncate max-w-[80%]">
                      {remoteUserName}
                    </span>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3">
                {messages.map((msg, index) => {
                  const isMe = msg.userId === user?.id;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <span className="text-[11px] text-slate-400 mb-1 px-1">
                        {msg.userName || 'User'}
                      </span>
                      <div
                        className={`p-3 rounded-xl max-w-[85%] md:max-w-md break-words text-sm shadow-sm ${
                          isMe
                            ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                            : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                        }`}
                      >
                        {msg.content}
                        {msg.file?.base64 && (
                          <div className="mt-2">
                            {msg.file.type?.startsWith('image/') ? (
                              <img
                                src={msg.file.base64}
                                alt={msg.file.name}
                                className="max-w-xs rounded-lg border border-black/10"
                              />
                            ) : (
                              <a
                                href={msg.file.base64}
                                download={msg.file.name}
                                className={`underline text-xs block truncate ${
                                  isMe ? 'text-slate-900 font-semibold' : 'text-amber-400'
                                }`}
                              >
                                📎 Download {msg.file.name}
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Bar with File Attachment Button */}
              <form
                onSubmit={sendMessage}
                className="p-3 md:p-4 bg-slate-900 border-t border-slate-800 flex gap-2 items-center shrink-0"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2.5 md:py-3 rounded-lg text-sm shrink-0 transition"
                >
                  📎
                </button>

                {selectedFile && (
                  <span className="text-xs bg-slate-800 border border-slate-700 text-amber-400 px-2 py-1 rounded max-w-[90px] sm:max-w-[120px] truncate shrink-0">
                    {selectedFile.name}
                  </span>
                )}

                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 min-w-0 p-2.5 md:p-3 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500/50 text-slate-100 placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 text-slate-950 px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm font-bold hover:bg-amber-400 transition shrink-0"
                >
                  Send
                </button>
              </form>
            </div>

            {/* Right-side Sidebar: Active Room Members */}
            <div
              className={`${
                showMobileMembers ? 'fixed inset-y-0 right-0 z-30 w-64' : 'hidden'
              } lg:flex lg:relative lg:w-64 bg-slate-900 p-4 flex-col border-l border-slate-800 shrink-0`}
            >
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Active Members ({roomMembers.length})
                </h4>
                <button
                  onClick={() => setShowMobileMembers(false)}
                  className="lg:hidden text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 overflow-y-auto flex-1 pr-1">
                {roomMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-sm p-2.5 bg-slate-800/50 border border-slate-800 rounded-lg"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span className="truncate text-slate-300">{member.userName}</span>
                    {member.userId === user?.id && (
                      <span className="text-[10px] text-amber-400 ml-auto shrink-0">(You)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center text-slate-500">
            <button
              onClick={() => setShowMobileRooms(true)}
              className="md:hidden mb-4 bg-amber-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold"
            >
              Open Channels
            </button>
            <span>Select or create a chat room to start messaging</span>
          </div>
        )}
      </div>
    </div>
  );
}