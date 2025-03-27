// backend/controllers/chatController.ts
import { Request, Response } from "express";
import Chat from "@models/Chat";

export const createChat = async (req: Request, res: Response) => {
  try {
    const { doctor, patient } = req.body;
    const newChat = await Chat.create({ doctor, patient });
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: "Failed to create chat" });
  }
};

export const getDoctorChats = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const chats = await Chat.find({ doctor: doctorId }).populate([
      "patient",
      "doctor",
    ]);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctor's chats" });
  }
};

export const getPatientChats = async (req: Request, res: Response) => {
  try {
    const { patientId } = req.params;
    const chats = await Chat.find({ patient: patientId }).populate([
      "patient",
      "doctor",
    ]);
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient's chats" });
  }
};
