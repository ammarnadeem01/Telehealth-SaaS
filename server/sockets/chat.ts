// server/sockets/chat.ts
import { Server, Socket } from "socket.io";
import Message from "@models/Message"; // Ensure your Message model exists

export const chatSocketHandler = (io: Server, socket: Socket) => {
  console.log(`Chat socket connected: ${socket.id}`);

  // Listen for incoming chat messages
  socket.on(
    "chatMessage",
    async (data: { sender: string; text: string; timestamp?: number }) => {
      // (Optional) Save message to DB
      try {
        const newMessage = new Message({
          sender: data.sender,
          text: data.text,
          timestamp: data.timestamp || Date.now(),
        });
        await newMessage.save();
      } catch (err) {
        console.error("Error saving message:", err);
      }
      // Emit the message to all clients
      io.emit("chatMessage", data);
    }
  );
};
