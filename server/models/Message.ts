import mongoose, { Schema } from "mongoose";
enum MessageType {
  File = "file",
  Text = "text",
}
interface IMessage {
  chat: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
  isRead: boolean;
  content: string;
  sentAt: Date;
  messageType: MessageType;
}
const messageSchema: Schema<IMessage> = new Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    messageType: {
      type: String,
      enum: [MessageType.File, MessageType.Text],
      required: true,
    },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
