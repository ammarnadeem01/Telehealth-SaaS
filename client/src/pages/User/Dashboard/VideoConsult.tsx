// src/pages/dashboard/VideoConsultPage.tsx
import { useState } from "react";
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

export default function VideoConsult() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [message, setMessage] = useState("");

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
            <Video className="h-5 w-5" />
            Video Consultation with Dr. Smith
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Doctor Video Feed */}
            <div className="lg:col-span-2 bg-black rounded-lg aspect-video relative">
              <div className="absolute bottom-4 right-4 w-1/4 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-white">Your Camera</span>
                </div>
              </div>
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
                    <p className="text-sm">{msg.text}</p>
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
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              onClick={() => setIsMuted(!isMuted)}
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
              onClick={() => setIsVideoOn(!isVideoOn)}
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
