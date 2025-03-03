// src/pages/dashboard/MessagesPage.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

const conversations = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    lastMessage: "Please follow up with the medication",
    time: "10:30 AM",
    unread: 2,
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    lastMessage: "Lab results are ready",
    time: "Yesterday",
    unread: 0,
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(1);
  const [newMessage, setNewMessage] = useState("");

  const messages = [
    { id: 1, text: "Hello Doctor!", sender: "patient", time: "10:00 AM" },
    {
      id: 2,
      text: "Hi John, how can I help?",
      sender: "doctor",
      time: "10:01 AM",
    },
  ];

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
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  onClick={() => setSelectedConversation(convo.id)}
                  className={`p-4 cursor-pointer rounded-lg ${
                    selectedConversation === convo.id
                      ? "bg-blue-50 border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{convo.doctor}</h3>
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
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 mb-2 rounded-lg ${
                        msg.sender === "patient"
                          ? "bg-blue-100 ml-auto"
                          : "bg-gray-100"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {msg.time}
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
                  <Button>Send</Button>
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
