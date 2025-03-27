// server/sockets/webrtc.ts
import { Server, Socket } from "socket.io";

export const webrtcSocketHandler = (io: Server, socket: Socket) => {
  console.log(`WebRTC socket connected: ${socket.id}`);

  // When a client sends an offer, forward it to the target
  socket.on("webrtcOffer", (data: { to: string; offer: any }) => {
    io.to(data.to).emit("webrtcOffer", { from: socket.id, offer: data.offer });
  });

  // When a client sends an answer, forward it to the target
  socket.on("webrtcAnswer", (data: { to: string; answer: any }) => {
    io.to(data.to).emit("webrtcAnswer", {
      from: socket.id,
      answer: data.answer,
    });
  });

  // When a client sends an ICE candidate, forward it to the target
  socket.on("iceCandidate", (data: { to: string; candidate: any }) => {
    io.to(data.to).emit("iceCandidate", {
      from: socket.id,
      candidate: data.candidate,
    });
  });
};
