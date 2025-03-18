// backend/controllers/messageController.ts
import { Request, Response } from "express";
import Message from "@models/Message";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { chat, sender, receiver, content, messageType } = req.body;
    const newMessage = await Message.create({
      chat,
      sender,
      receiver,
      content,
      messageType,
    });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    console.log("chatid", chatId);
    const messages = await Message.find({ chat: chatId }).populate([
      "sender",
      "receiver",
    ]);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
