// import { useEffect, useRef, useState } from "react";
// import io from "socket.io-client";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   PhoneOff,
//   MessageSquare,
// } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";

// const socket = io("http://localhost:3000");

// // Define ICE servers – in production, add TURN servers as needed.
// const iceServers = {
//   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
// };

// export default function VideoConsult() {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(true);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [callInitiated, setCallInitiated] = useState(false);

//   // For demonstration, using static room and target user IDs.
//   const roomId = "videoRoom1";
//   const callUserId = "targetUserId"; // Replace with the actual target user's socket ID

//   useEffect(() => {
//     socket.emit("joinChat", roomId);

//     const initMedia = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         setLocalStream(stream);
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//         peerConnectionRef.current = new RTCPeerConnection(iceServers);
//         stream.getTracks().forEach((track) => {
//           peerConnectionRef.current?.addTrack(track, stream);
//         });
//         peerConnectionRef.current.ontrack = (event) => {
//           if (remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = event.streams[0];
//           }
//         };
//         peerConnectionRef.current.onicecandidate = (event) => {
//           if (event.candidate) {
//             socket.emit("iceCandidate", {
//               to: callUserId,
//               candidate: event.candidate,
//             });
//           }
//         };
//       } catch (err) {
//         console.error("Error accessing media devices.", err);
//       }
//     };

//     initMedia();

//     socket.on("incomingCall", async (data: any) => {
//       if (peerConnectionRef.current) {
//         await peerConnectionRef.current.setRemoteDescription(data.signal);
//         const answer = await peerConnectionRef.current.createAnswer();
//         await peerConnectionRef.current.setLocalDescription(answer);
//         socket.emit("answerCall", { to: data.from, signal: answer });
//       }
//     });

//     socket.on("callAccepted", async (signal: any) => {
//       if (peerConnectionRef.current) {
//         await peerConnectionRef.current.setRemoteDescription(signal);
//       }
//     });

//     socket.on("iceCandidate", async (candidate: RTCIceCandidateInit) => {
//       try {
//         await peerConnectionRef.current?.addIceCandidate(candidate);
//       } catch (error) {
//         console.error("Error adding received ICE candidate", error);
//       }
//     });

//     socket.on("receiveMessage", (data) => {
//       if (data.chat === roomId || data.chatId === roomId) {
//         setMessages((prev) => [...prev, data]);
//       }
//     });

//     return () => {
//       socket.off("incomingCall");
//       socket.off("callAccepted");
//       socket.off("iceCandidate");
//       socket.off("receiveMessage");
//     };
//   }, []);

//   const startCall = async () => {
//     if (peerConnectionRef.current) {
//       const offer = await peerConnectionRef.current.createOffer();
//       await peerConnectionRef.current.setLocalDescription(offer);
//       socket.emit("callUser", {
//         userToCall: callUserId,
//         signal: offer,
//         from: socket.id,
//       });
//       setCallInitiated(true);
//     }
//   };

//   const handleSendMessage = () => {
//     const messageData = {
//       id: Date.now(),
//       text: message,
//       sender: "patient", // Replace with the actual user ID
//       time: new Date().toLocaleTimeString(),
//     };
//     socket.emit("sendMessage", { chatId: roomId, ...messageData });
//     setMessages((prev) => [...prev, messageData]);
//     setMessage("");
//   };

//   return (
//     <div className="space-y-4">
//       <Card>
//         <CardHeader className="border-b">
//           <CardTitle className="flex items-center gap-2">
//             <Video className="h-5 w-5" />
//             Video Consultation with Dr. Smith
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-4 space-y-4">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//             {/* Video Feed Section */}
//             <div className="lg:col-span-2 bg-black rounded-lg aspect-video relative">
//               <video
//                 ref={remoteVideoRef}
//                 autoPlay
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-800 rounded-lg overflow-hidden">
//                 <video
//                   ref={localVideoRef}
//                   muted
//                   autoPlay
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               {!callInitiated && (
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <Button onClick={startCall}>Start Call</Button>
//                 </div>
//               )}
//             </div>
//             {/* Chat Section */}
//             <div className="border rounded-lg p-4 h-[500px] flex flex-col">
//               <ScrollArea className="flex-1 mb-4">
//                 {messages.map((msg) => (
//                   <div
//                     key={msg.id}
//                     className={`p-3 mb-2 rounded-lg ${
//                       msg.sender === "patient"
//                         ? "bg-blue-100 ml-auto"
//                         : "bg-gray-100"
//                     }`}
//                   >
//                     <p className="text-sm">{msg.text || msg.content}</p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       {msg.time}
//                     </p>
//                   </div>
//                 ))}
//               </ScrollArea>
//               <div className="flex gap-2">
//                 <Input
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   placeholder="Type a message..."
//                 />
//                 <Button variant="outline" onClick={handleSendMessage}>
//                   <MessageSquare className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//           </div>
//           {/* Call Controls */}
//           <div className="flex justify-center gap-4">
//             <Button
//               variant={isMuted ? "destructive" : "outline"}
//               size="lg"
//               onClick={() => {
//                 setIsMuted(!isMuted);
//                 localStream?.getAudioTracks().forEach((track) => {
//                   track.enabled = !track.enabled;
//                 });
//               }}
//             >
//               {isMuted ? (
//                 <MicOff className="h-5 w-5" />
//               ) : (
//                 <Mic className="h-5 w-5" />
//               )}
//             </Button>
//             <Button
//               variant={!isVideoOn ? "destructive" : "outline"}
//               size="lg"
//               onClick={() => {
//                 setIsVideoOn(!isVideoOn);
//                 localStream?.getVideoTracks().forEach((track) => {
//                   track.enabled = !track.enabled;
//                 });
//               }}
//             >
//               {isVideoOn ? (
//                 <Video className="h-5 w-5" />
//               ) : (
//                 <VideoOff className="h-5 w-5" />
//               )}
//             </Button>
//             <Button variant="destructive" size="lg">
//               <PhoneOff className="h-5 w-5" />
//               End Call
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const socket = io("http://localhost:3000");

// Define ICE servers – in production, add TURN servers as needed.
const iceServers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoChat() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [usersInRoom, setUsersInRoom] = useState<string[]>([]);
  const [otherPeerId, setOtherPeerId] = useState<string | null>(null);
  const [callInitiated, setCallInitiated] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  // For demonstration, using static room ID.
  const roomId = "videoRoom1";

  useEffect(() => {
    socket.emit("joinChat", roomId);

    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        peerConnectionRef.current = new RTCPeerConnection(iceServers);
        stream.getTracks().forEach((track) => {
          peerConnectionRef.current?.addTrack(track, stream);
        });
        peerConnectionRef.current.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };
        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate && otherPeerId) {
            socket.emit("iceCandidate", {
              to: otherPeerId,
              candidate: event.candidate,
            });
          }
        };
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    initMedia();

    socket.on("existingUsers", (users: string[]) => {
      setUsersInRoom(users);
      if (users.length > 0) {
        setOtherPeerId(users[0]); // For simplicity, pick first user
      }
    });

    socket.on("newUser", (socketId: string) => {
      setUsersInRoom((prev) => [...prev, socketId]);
      setOtherPeerId(socketId);
    });

    socket.on("userLeft", (socketId: string) => {
      setUsersInRoom((prev) => prev.filter((id) => id !== socketId));
      if (socketId === otherPeerId) {
        setOtherPeerId(null);
        // Handle call termination
      }
    });

    socket.on("incomingCall", async (data: any) => {
      setOtherPeerId(data.from);
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(data.signal);
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        socket.emit("answerCall", { to: data.from, signal: answer });
      }
    });

    socket.on("callAccepted", async (data: { signal: any; from: string }) => {
      setOtherPeerId(data.from);
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(data.signal);
      }
    });

    socket.on("iceCandidate", async (candidate: RTCIceCandidateInit) => {
      try {
        await peerConnectionRef.current?.addIceCandidate(candidate);
      } catch (error) {
        console.error("Error adding received ICE candidate", error);
      }
    });

    socket.on("receiveMessage", (data) => {
      if (data.chat === roomId || data.chatId === roomId) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.off("incomingCall");
      socket.off("callAccepted");
      socket.off("iceCandidate");
      socket.off("receiveMessage");
      socket.off("existingUsers");
      socket.off("newUser");
      socket.off("userLeft");
    };
  }, [otherPeerId]);

  const startCall = async () => {
    if (peerConnectionRef.current && otherPeerId) {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socket.emit("callUser", {
        userToCall: otherPeerId,
        signal: offer,
        from: socket.id,
      });
      setCallInitiated(true);
    }
  };

  const handleSendMessage = () => {
    const messageData = {
      id: Date.now(),
      text: message,
      sender: "patient", // Replace with the actual user ID
      time: new Date().toLocaleTimeString(),
    };
    socket.emit("sendMessage", { chatId: roomId, ...messageData });
    setMessages((prev) => [...prev, messageData]);
    setMessage("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Consultation with Dr. Smith
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Video Feed Section */}
            <div className="lg:col-span-2 bg-black rounded-lg aspect-video relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <video
                  ref={localVideoRef}
                  muted
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
              {!callInitiated && otherPeerId && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button onClick={startCall}>Start Call</Button>
                </div>
              )}
            </div>
            {/* Chat Section */}
            <div className="border rounded-lg p-4 h-[500px] flex flex-col">
              <ScrollArea className="flex-1 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 mb-2 rounded-lg ${
                      msg.sender === "patient"
                        ? "bg-blue-100 ml-auto"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.text || msg.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {msg.time}
                    </p>
                  </div>
                ))}
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                />
                <Button variant="outline" onClick={handleSendMessage}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {/* Call Controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              onClick={() => {
                setIsMuted(!isMuted);
                localStream?.getAudioTracks().forEach((track) => {
                  track.enabled = !track.enabled;
                });
              }}
            >
              {isMuted ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant={!isVideoOn ? "destructive" : "outline"}
              size="lg"
              onClick={() => {
                setIsVideoOn(!isVideoOn);
                localStream?.getVideoTracks().forEach((track) => {
                  track.enabled = !track.enabled;
                });
              }}
            >
              {isVideoOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
            <Button variant="destructive" size="lg">
              <PhoneOff className="h-5 w-5" />
              End Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
