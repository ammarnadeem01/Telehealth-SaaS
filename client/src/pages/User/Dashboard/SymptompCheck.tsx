// src/pages/dashboard/SymptomCheck.tsx
// import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { useState } from "react";
import Markdown from "react-markdown";

const SymptomCheck = () => {
  // const { token } = useAuthStore((state) => state.token);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm HealthBot. What symptoms are you experiencing?",
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: inputText, isBot: false }]);
    axios
      .post("http://localhost:8000/analyze-symptoms", {
        user_input: inputText,
        use_case: "symptom_retriever",
        medical_history: JSON.stringify(messages),
      })
      .then((data: any) => {
        console.log(data.data.response);
        setMessages((prev) => [
          ...prev,
          {
            text: data.data.response,
            isBot: true,
          },
        ]);
      })
      .catch((err: any) => {
        console.log(err);
      });
    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Thank you for sharing. Let me analyze that...", isBot: true },
      ]);
    }, 1000);

    setInputText("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        AI Symptom Checker
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.isBot
                    ? "bg-gray-100 text-gray-900"
                    : "bg-blue-600 text-white"
                }`}
              >
                <Markdown>{message.text}</Markdown>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SymptomCheck;
