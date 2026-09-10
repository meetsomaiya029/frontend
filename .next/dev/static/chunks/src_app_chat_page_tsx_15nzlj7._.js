(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/chat/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ICE_SERVERS = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        },
        {
            urls: 'stun:stun1.l.google.com:19302'
        },
        {
            urls: 'stun:stun2.l.google.com:19302'
        }
    ]
};
function ChatPage() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rooms, setRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentRoom, setCurrentRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [roomMembers, setRoomMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newRoomName, setNewRoomName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination State
    const [hasMoreMessages, setHasMoreMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const chatContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Message Editing State
    const [editingMessageId, setEditingMessageId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingContent, setEditingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Mobile Viewport Drawer States
    const [showMobileRooms, setShowMobileRooms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [showMobileMembers, setShowMobileMembers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // WebRTC State
    const [isInCall, setIsInCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [remoteStream, setRemoteStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [remoteUserName, setRemoteUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Remote Peer');
    const localVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const remoteVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const peerConnectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localStreamRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const iceCandidatesQueueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Media Controls State
    const [isMuted, setIsMuted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVideoOff, setIsVideoOff] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // File Upload State
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            if (!token || !storedUser) {
                router.push('/');
                return;
            }
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            const newSocket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])('http://13.60.33.130:3001', {
                auth: {
                    token
                }
            });
            setSocket(newSocket);
            fetchRooms();
            newSocket.on('receive_message', {
                "ChatPage.useEffect": (message)=>{
                    setMessages({
                        "ChatPage.useEffect": (prev)=>[
                                ...prev,
                                message
                            ]
                    }["ChatPage.useEffect"]);
                    scrollToBottom();
                }
            }["ChatPage.useEffect"]);
            newSocket.on('message_edited', {
                "ChatPage.useEffect": (updatedMessage)=>{
                    setMessages({
                        "ChatPage.useEffect": (prev)=>prev.map({
                                "ChatPage.useEffect": (msg)=>msg.id === updatedMessage.id ? {
                                        ...msg,
                                        ...updatedMessage
                                    } : msg
                            }["ChatPage.useEffect"])
                    }["ChatPage.useEffect"]);
                }
            }["ChatPage.useEffect"]);
            newSocket.on('message_deleted', {
                "ChatPage.useEffect": ({ messageId })=>{
                    setMessages({
                        "ChatPage.useEffect": (prev)=>prev.filter({
                                "ChatPage.useEffect": (msg)=>msg.id !== messageId
                            }["ChatPage.useEffect"])
                    }["ChatPage.useEffect"]);
                }
            }["ChatPage.useEffect"]);
            newSocket.on('room_users', {
                "ChatPage.useEffect": (users)=>{
                    setRoomMembers(users);
                }
            }["ChatPage.useEffect"]);
            // WebRTC Signaling Listeners
            newSocket.on('webrtc_offer', {
                "ChatPage.useEffect": async ({ offer, senderName })=>{
                    if (senderName) setRemoteUserName(senderName);
                    await handleIncomingOffer(offer, newSocket);
                }
            }["ChatPage.useEffect"]);
            newSocket.on('webrtc_answer', {
                "ChatPage.useEffect": async ({ answer, senderName })=>{
                    if (senderName) setRemoteUserName(senderName);
                    if (peerConnectionRef.current) {
                        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
                        while(iceCandidatesQueueRef.current.length > 0){
                            const candidate = iceCandidatesQueueRef.current.shift();
                            if (candidate) {
                                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                            }
                        }
                    }
                }
            }["ChatPage.useEffect"]);
            newSocket.on('webrtc_ice_candidate', {
                "ChatPage.useEffect": async ({ candidate })=>{
                    if (peerConnectionRef.current && peerConnectionRef.current.remoteDescription) {
                        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
                    } else {
                        iceCandidatesQueueRef.current.push(candidate);
                    }
                }
            }["ChatPage.useEffect"]);
            return ({
                "ChatPage.useEffect": ()=>{
                    newSocket.disconnect();
                }
            })["ChatPage.useEffect"];
        }
    }["ChatPage.useEffect"], []);
    // Sync local media stream whenever video DOM element mounts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (isInCall && localStreamRef.current && localVideoRef.current) {
                localVideoRef.current.srcObject = localStreamRef.current;
            }
        }
    }["ChatPage.useEffect"], [
        isInCall
    ]);
    // Sync remote media stream whenever video DOM element mounts or stream updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatPage.useEffect": ()=>{
            if (isInCall && remoteStream && remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play().catch({
                    "ChatPage.useEffect": (err)=>console.error('Error auto-playing remote video:', err)
                }["ChatPage.useEffect"]);
            }
        }
    }["ChatPage.useEffect"], [
        isInCall,
        remoteStream
    ]);
    const scrollToBottom = ()=>{
        setTimeout(()=>{
            if (chatContainerRef.current) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, 50);
    };
    const fetchRooms = async ()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://13.60.33.130:3001/api/chat/rooms', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setRooms(data);
            }
        } catch (err) {
            console.error('Failed to fetch rooms', err);
        }
    };
    const createRoom = async (e)=>{
        e.preventDefault();
        if (!newRoomName.trim()) return;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://13.60.33.130:3001/api/chat/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: newRoomName,
                    userId: user?.id
                })
            });
            if (res.ok) {
                setNewRoomName('');
                fetchRooms();
            }
        } catch (err) {
            console.error('Error creating room', err);
        }
    };
    // Fetch Initial Room Messages with Pagination Support
    const fetchRoomMessages = async (roomId)=>{
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://13.60.33.130:3001/api/chat/rooms/${roomId}/messages?limit=20`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                const formatted = data.map((msg)=>({
                        ...msg,
                        userName: msg.userName || msg.user?.name || 'User'
                    }));
                setMessages(formatted);
                setHasMoreMessages(data.length >= 20);
                scrollToBottom();
            }
        } catch (err) {
            console.error('Failed to fetch messages', err);
        }
    };
    // Fetch Older Messages On Scroll Top
    const loadMoreMessages = async ()=>{
        if (!currentRoom || isLoadingMore || !hasMoreMessages || messages.length === 0) return;
        setIsLoadingMore(true);
        const firstMessageId = messages[0]?.id;
        const scrollContainer = chatContainerRef.current;
        const previousScrollHeight = scrollContainer ? scrollContainer.scrollHeight : 0;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://13.60.33.130:3001/api/chat/rooms/${currentRoom.id}/messages?cursor=${firstMessageId}&limit=20`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.ok) {
                const olderMessages = await res.json();
                if (olderMessages.length < 20) {
                    setHasMoreMessages(false);
                }
                const formatted = olderMessages.map((msg)=>({
                        ...msg,
                        userName: msg.userName || msg.user?.name || 'User'
                    }));
                setMessages((prev)=>[
                        ...formatted,
                        ...prev
                    ]);
                // Retain scroll position relative to previous top content
                setTimeout(()=>{
                    if (scrollContainer) {
                        scrollContainer.scrollTop = scrollContainer.scrollHeight - previousScrollHeight;
                    }
                }, 0);
            }
        } catch (err) {
            console.error('Failed to load older messages', err);
        } finally{
            setIsLoadingMore(false);
        }
    };
    const handleScroll = (e)=>{
        if (e.currentTarget.scrollTop === 0 && hasMoreMessages && !isLoadingMore) {
            loadMoreMessages();
        }
    };
    const joinRoom = (room)=>{
        setCurrentRoom(room);
        setMessages([]);
        setHasMoreMessages(true);
        setShowMobileRooms(false);
        setShowMobileMembers(false);
        fetchRoomMessages(room.id);
        socket?.emit('join_room', {
            roomId: room.id,
            userId: user?.id,
            userName: user?.name
        });
    };
    const handleFileUpload = (e)=>{
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };
    const sendMessage = (e)=>{
        e.preventDefault();
        if (!newMessage.trim() && !selectedFile || !currentRoom) return;
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = ()=>{
                socket?.emit('send_message', {
                    roomId: currentRoom.id,
                    content: newMessage || `Sent file: ${selectedFile.name}`,
                    file: {
                        name: selectedFile.name,
                        type: selectedFile.type,
                        base64: reader.result
                    },
                    userId: user.id,
                    userName: user.name
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
                userName: user.name
            });
            setNewMessage('');
        }
    };
    // Edit Message Handler
    const handleSaveEdit = async (messageId)=>{
        if (!editingContent.trim() || !currentRoom?.id) return;
        try {
            const token = localStorage.getItem('token');
            const currentUserId = user?.id || localStorage.getItem('userId');
            const res = await fetch(`http://13.60.33.130:3001/api/chat/messages/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: editingContent,
                    userId: currentUserId
                })
            });
            if (res.ok) {
                const updatedMsg = await res.json();
                // 1. Optimistically update local React state for sender
                setMessages((prevMessages)=>prevMessages.map((msg)=>msg.id === messageId ? updatedMsg : msg));
                // 2. Broadcast updated payload over Socket.io to other users in the room
                socket?.emit('edit_message', {
                    roomId: currentRoom.id,
                    message: updatedMsg
                });
                setEditingMessageId(null);
                setEditingContent('');
            } else {
                console.error('Edit request failed with status:', res.status);
            }
        } catch (err) {
            console.error('Failed to edit message:', err);
        }
    };
    // Delete Message Handler
    const handleDeleteMessage = async (messageId)=>{
        if (!currentRoom?.id) return;
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const token = localStorage.getItem('token');
            const currentUserId = user?.id || localStorage.getItem('userId');
            const res = await fetch(`http://13.60.33.130:3001/api/chat/messages/${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId: currentUserId
                })
            });
            if (res.ok) {
                // 1. Optimistically update local React state for sender
                setMessages((prevMessages)=>prevMessages.filter((msg)=>msg.id !== messageId));
                // 2. Broadcast deletion over Socket.io to other users in the room
                socket?.emit('delete_message', {
                    roomId: currentRoom.id,
                    messageId
                });
            } else {
                console.error('Delete request failed with status:', res.status);
            }
        } catch (err) {
            console.error('Failed to delete message:', err);
        }
    };
    // --- WEBRTC & MEDIA CONTROL METHODS ---
    const toggleAudio = ()=>{
        if (localStreamRef.current) {
            const audioTrack = localStreamRef.current.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsMuted(!audioTrack.enabled);
            }
        }
    };
    const toggleVideo = ()=>{
        if (localStreamRef.current) {
            const videoTrack = localStreamRef.current.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };
    const initPeerConnection = (activeSocket)=>{
        const pc = new RTCPeerConnection(ICE_SERVERS);
        pc.onicecandidate = (event)=>{
            if (event.candidate && currentRoom) {
                activeSocket.emit('webrtc_ice_candidate', {
                    roomId: currentRoom.id,
                    candidate: event.candidate,
                    senderId: user.id
                });
            }
        };
        pc.ontrack = (event)=>{
            if (event.streams && event.streams[0]) {
                setRemoteStream(event.streams[0]);
            }
        };
        peerConnectionRef.current = pc;
        return pc;
    };
    const startCall = async ()=>{
        if (!socket || !currentRoom) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localStreamRef.current = stream;
            setIsInCall(true);
            const pc = initPeerConnection(socket);
            stream.getTracks().forEach((track)=>pc.addTrack(track, stream));
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit('webrtc_offer', {
                roomId: currentRoom.id,
                offer,
                senderId: user.id,
                senderName: user.name
            });
        } catch (err) {
            console.error('Failed to access media devices', err);
        }
    };
    const handleIncomingOffer = async (offer, activeSocket)=>{
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });
            localStreamRef.current = stream;
            setIsInCall(true);
            const pc = initPeerConnection(activeSocket);
            stream.getTracks().forEach((track)=>pc.addTrack(track, stream));
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            while(iceCandidatesQueueRef.current.length > 0){
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
                senderName: user?.name
            });
        } catch (err) {
            console.error('Error answering WebRTC offer', err);
        }
    };
    const endCall = ()=>{
        localStreamRef.current?.getTracks().forEach((track)=>track.stop());
        peerConnectionRef.current?.close();
        peerConnectionRef.current = null;
        iceCandidatesQueueRef.current = [];
        setRemoteStream(null);
        setRemoteUserName('Remote Peer');
        setIsInCall(false);
        setIsMuted(false);
        setIsVideoOff(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${showMobileRooms ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/4 h-full bg-slate-900 border-r border-slate-800 p-4 z-20 shrink-0`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6 pb-3 border-b border-slate-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-3 h-3 rounded-full bg-amber-500 animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 528,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-base font-extrabold tracking-wider text-amber-400 uppercase",
                                                children: "PLUS UAE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 530,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[10px] text-slate-400 tracking-widest uppercase",
                                                children: "Enterprise Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 533,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 527,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    localStorage.clear();
                                    router.push('/');
                                },
                                className: "text-xs bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded hover:bg-red-600 hover:text-white transition",
                                children: "Logout"
                            }, void 0, false, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 538,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chat/page.tsx",
                        lineNumber: 526,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xs font-bold uppercase tracking-wider text-slate-400 mb-2",
                                children: "Chat Rooms"
                            }, void 0, false, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 550,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: createRoom,
                                className: "flex gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "New channel name...",
                                        value: newRoomName,
                                        onChange: (e)=>setNewRoomName(e.target.value),
                                        className: "w-full p-2.5 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500/50 transition text-slate-200 placeholder-slate-500"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 554,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "bg-amber-500 text-slate-950 px-4 py-2.5 text-sm rounded-lg font-bold hover:bg-amber-400 transition",
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 561,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/chat/page.tsx",
                        lineNumber: 549,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto space-y-1.5 pr-1",
                        children: rooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>joinRoom(room),
                                className: `p-3 rounded-lg cursor-pointer transition flex items-center justify-between ${currentRoom?.id === room.id ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold' : 'bg-slate-800/60 border border-transparent hover:bg-slate-800 text-slate-300'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate text-sm",
                                        children: [
                                            "# ",
                                            room.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 15
                                    }, this),
                                    currentRoom?.id === room.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-2 h-2 rounded-full bg-amber-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/chat/page.tsx",
                                        lineNumber: 583,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, room.id, true, {
                                fileName: "[project]/src/app/chat/page.tsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/chat/page.tsx",
                        lineNumber: 570,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/chat/page.tsx",
                lineNumber: 521,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${!showMobileRooms ? 'flex' : 'hidden'} md:flex flex-1 h-full w-full bg-slate-950 overflow-hidden relative`,
                children: currentRoom ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 h-full w-full overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col h-full overflow-hidden border-r border-slate-800",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 md:p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowMobileRooms(true),
                                                    className: "md:hidden bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300",
                                                    children: "← Channels"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 602,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base md:text-lg font-bold text-slate-100 truncate",
                                                    children: [
                                                        "# ",
                                                        currentRoom.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 601,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 items-center shrink-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setShowMobileMembers(!showMobileMembers),
                                                    className: "lg:hidden bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300",
                                                    children: [
                                                        "👥 (",
                                                        roomMembers.length,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 19
                                                }, this),
                                                isInCall && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: toggleAudio,
                                                            className: `px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold transition ${isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-200'}`,
                                                            children: isMuted ? 'Unmute' : 'Mute'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                            lineNumber: 623,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: toggleVideo,
                                                            className: `px-3 py-1.5 md:py-2 rounded-lg text-xs font-semibold transition ${isVideoOff ? 'bg-red-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-200'}`,
                                                            children: isVideoOff ? 'Cam Off' : 'Cam On'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                            lineNumber: 633,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 622,
                                                    columnNumber: 21
                                                }, this),
                                                !isInCall ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: startCall,
                                                    className: "bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition shadow-lg shadow-emerald-950/50",
                                                    children: "Start Call"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: endCall,
                                                    className: "bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition shadow-lg shadow-red-950/50",
                                                    children: "End Call"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 654,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 613,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 600,
                                    columnNumber: 15
                                }, this),
                                isInCall && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3 bg-black border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 h-60 sm:h-64 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    ref: localVideoRef,
                                                    autoPlay: true,
                                                    playsInline: true,
                                                    muted: true,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute bottom-2 left-2 bg-slate-950/80 text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold rounded",
                                                    children: "You"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 675,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 667,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    ref: remoteVideoRef,
                                                    autoPlay: true,
                                                    playsInline: true,
                                                    className: "w-full h-full object-cover"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 680,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute bottom-2 left-2 bg-slate-950/80 text-slate-200 border border-slate-700 px-2 py-0.5 text-[10px] font-semibold rounded truncate max-w-[80%]",
                                                    children: remoteUserName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 679,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 666,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    ref: chatContainerRef,
                                    onScroll: handleScroll,
                                    className: "flex-1 p-3 md:p-4 overflow-y-auto space-y-3",
                                    children: [
                                        isLoadingMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center text-xs text-amber-400 py-2 font-medium",
                                            children: "Loading older messages..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 700,
                                            columnNumber: 19
                                        }, this),
                                        messages.map((msg, index)=>{
                                            const isMe = msg.userId === user?.id;
                                            const isEditing = editingMessageId === msg.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `flex flex-col group ${isMe ? 'items-end' : 'items-start'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-slate-400 mb-1 px-1",
                                                        children: [
                                                            msg.userName || 'User',
                                                            msg.isEdited && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-1 text-[9px] text-slate-500",
                                                                children: "(edited)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/chat/page.tsx",
                                                                lineNumber: 716,
                                                                columnNumber: 42
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/chat/page.tsx",
                                                        lineNumber: 714,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `relative p-3 rounded-xl max-w-[85%] md:max-w-md break-words text-sm shadow-sm ${isMe ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none' : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'}`,
                                                        children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col gap-2 min-w-[200px]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: editingContent,
                                                                    onChange: (e)=>setEditingContent(e.target.value),
                                                                    className: "p-1.5 text-xs bg-slate-950 text-slate-100 border border-slate-700 rounded focus:outline-none"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                                    lineNumber: 728,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-2 justify-end",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleSaveEdit(msg.id),
                                                                            className: "text-[10px] bg-slate-950 text-amber-400 px-2 py-1 rounded border border-amber-500/30",
                                                                            children: "Save"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                                            lineNumber: 735,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>setEditingMessageId(null),
                                                                            className: "text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded",
                                                                            children: "Cancel"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                                            lineNumber: 741,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                                    lineNumber: 734,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 27
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                msg.content,
                                                                msg.file?.base64 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2",
                                                                    children: msg.file.type?.startsWith('image/') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: msg.file.base64,
                                                                        alt: msg.file.name,
                                                                        className: "max-w-xs rounded-lg border border-black/10"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/chat/page.tsx",
                                                                        lineNumber: 755,
                                                                        columnNumber: 35
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                        href: msg.file.base64,
                                                                        download: msg.file.name,
                                                                        className: `underline text-xs block truncate ${isMe ? 'text-slate-900 font-semibold' : 'text-amber-400'}`,
                                                                        children: [
                                                                            "📎 Download ",
                                                                            msg.file.name
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/chat/page.tsx",
                                                                        lineNumber: 761,
                                                                        columnNumber: 35
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                                    lineNumber: 753,
                                                                    columnNumber: 31
                                                                }, this),
                                                                isMe && !isEditing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute -top-3 right-1 hidden group-hover:flex items-center bg-slate-900 border border-slate-800 rounded px-1 py-0.5 gap-1 shadow-md",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                setEditingMessageId(msg.id);
                                                                                setEditingContent(msg.content);
                                                                            },
                                                                            className: "text-[10px] text-amber-400 hover:text-amber-300 px-1",
                                                                            children: "✏️"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                                            lineNumber: 777,
                                                                            columnNumber: 33
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleDeleteMessage(msg.id),
                                                                            className: "text-[10px] text-red-400 hover:text-red-300 px-1",
                                                                            children: "🗑️"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                                            lineNumber: 786,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                                    lineNumber: 776,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/chat/page.tsx",
                                                            lineNumber: 750,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/chat/page.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, msg.id || index, true, {
                                                fileName: "[project]/src/app/chat/page.tsx",
                                                lineNumber: 710,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 694,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: sendMessage,
                                    className: "p-3 md:p-4 bg-slate-900 border-t border-slate-800 flex gap-2 items-center shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            ref: fileInputRef,
                                            onChange: handleFileUpload,
                                            className: "hidden"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 807,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>fileInputRef.current?.click(),
                                            className: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2.5 md:py-3 rounded-lg text-sm shrink-0 transition",
                                            children: "📎"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 813,
                                            columnNumber: 17
                                        }, this),
                                        selectedFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs bg-slate-800 border border-slate-700 text-amber-400 px-2 py-1 rounded max-w-[90px] sm:max-w-[120px] truncate shrink-0",
                                            children: selectedFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 822,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Type a message...",
                                            value: newMessage,
                                            onChange: (e)=>setNewMessage(e.target.value),
                                            className: "flex-1 min-w-0 p-2.5 md:p-3 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-amber-500/50 text-slate-100 placeholder-slate-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 827,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "bg-amber-500 text-slate-950 px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm font-bold hover:bg-amber-400 transition shrink-0",
                                            children: "Send"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 834,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 803,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 598,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `${showMobileMembers ? 'fixed inset-y-0 right-0 z-30 w-64' : 'hidden'} lg:flex lg:relative lg:w-64 bg-slate-900 p-4 flex-col border-l border-slate-800 shrink-0`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-4 pb-2 border-b border-slate-800",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-bold text-amber-400 uppercase tracking-wider",
                                            children: [
                                                "Active Members (",
                                                roomMembers.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 850,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowMobileMembers(false),
                                            className: "lg:hidden text-xs text-slate-400 hover:text-white",
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 853,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 849,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 overflow-y-auto flex-1 pr-1",
                                    children: roomMembers.map((member, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2.5 text-sm p-2.5 bg-slate-800/50 border border-slate-800 rounded-lg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 867,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate text-slate-300",
                                                    children: member.userName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 868,
                                                    columnNumber: 21
                                                }, this),
                                                member.userId === user?.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-amber-400 ml-auto shrink-0",
                                                    children: "(You)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/chat/page.tsx",
                                                    lineNumber: 870,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/src/app/chat/page.tsx",
                                            lineNumber: 863,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/chat/page.tsx",
                                    lineNumber: 861,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 844,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 597,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col items-center justify-center p-4 text-center text-slate-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setShowMobileRooms(true),
                            className: "md:hidden mb-4 bg-amber-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold",
                            children: "Open Channels"
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 879,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Select or create a chat room to start messaging"
                        }, void 0, false, {
                            fileName: "[project]/src/app/chat/page.tsx",
                            lineNumber: 885,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/chat/page.tsx",
                    lineNumber: 878,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/chat/page.tsx",
                lineNumber: 591,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/chat/page.tsx",
        lineNumber: 519,
        columnNumber: 5
    }, this);
}
_s(ChatPage, "VgTrfnbBDs+UST6IVxgL2pTUKgE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = ChatPage;
var _c;
__turbopack_context__.k.register(_c, "ChatPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_chat_page_tsx_15nzlj7._.js.map