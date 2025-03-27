import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

const socket = io("http://localhost:3000");

import { useAuthStore } from "@/store/authStore";
import axios from "axios";

export default function Messages() {
  const userId = useAuthStore((state) => state.userId);
  const [conversations, setConversations] = useState<any[]>();
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("");
  const [selectedRecceiver, setSelectedReceiver] = useState<string | null>("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/chat/doctor/${userId}`)
      .then((response) => {
        console.log(response);
        setConversations(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (selectedConversation) {
      socket.emit("joinChat", selectedConversation);
      socket.on("receiveMessage", (data) => {
        if (
          data.chat === selectedConversation ||
          data.chatId === selectedConversation
        ) {
          setMessages((prev) => [...prev, data]);
        }
      });
    }
    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedConversation]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/message/${selectedConversation}`)
      .then((response) => {
        console.log(response);
        setMessages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedConversation]);

  const handleSend = () => {
    const messageData = {
      chatId: selectedConversation,
      text: newMessage,
      sender: userId,
      receiver: selectedRecceiver,
      time: new Date().toLocaleTimeString(),
    };
    console.log("selectedconvo", selectedConversation);
    console.log("messageData", messageData);
    socket.emit("sendMessage", messageData);
    // setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex gap-4 h-[600px]">
          {/* Conversation List */}
          <div className="w-1/3 border-r pr-4">
            <ScrollArea className="h-full">
              {conversations &&
                conversations.map((convo: any) => (
                  <div
                    key={convo.id}
                    onClick={() => {
                      setSelectedReceiver(convo.doctor);
                      setSelectedConversation(convo._id);
                    }}
                    className={`p-4 cursor-pointer rounded-lg ${
                      selectedConversation === convo.id
                        ? "bg-blue-50 border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{convo.patient.name}</h3>
                      {convo.unread > 0 && (
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {convo.lastMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {convo.time}
                    </p>
                  </div>
                ))}
            </ScrollArea>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <ScrollArea className="flex-1 mb-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 mb-2 rounded-lg ${
                        msg.sender === "patient"
                          ? "bg-blue-100 ml-auto"
                          : "bg-gray-100"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      <p className="text-sm">{msg.text || msg.content}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(msg.createdAt).toLocaleTimeString()}{" "}
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <Button onClick={handleSend}>Send</Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start chatting
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
