"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface Message {
  id: number;
  from: string;
  to: string;
  content: string;
  timestamp: string;
}

const dummyMessages: Message[] = [
  {
    id: 1,
    from: "Anna Kowalska",
    to: "Ty",
    content: "",
    timestamp: "2025-05-01 14:30",
  },
  {
    id: 2,
    from: "Ty",
    to: "Anna Kowalska",
    content: "",
    timestamp: "2025-05-01 14:35",
  },
];

const MessagesPage = () => {
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [form, setForm] = useState({ recipient: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    const newMessage: Message = {
      id: messages.length + 1,
      from: "Ty",
      to: form.recipient,
      content: form.message,
      timestamp: new Date().toLocaleString(),
    };

    setMessages([...messages, newMessage]);
    setForm({ recipient: "", message: "" });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📨 Twoje wiadomości</h1>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-10 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-md ${msg.from === "Ty" ? "bg-blue-100 ml-auto max-w-[70%]" : "bg-gray-100 max-w-[70%]"}`}
          >
            <div className="text-sm text-gray-700">
              <strong>{msg.from}</strong> ➜ <strong>{msg.to}</strong>
            </div>
            <div className="text-gray-800 mt-1">{msg.content}</div>
            <div className="text-xs text-gray-500 mt-1">{msg.timestamp}</div>
          </div>
        ))}
      </div>

      {/* Panel do wysyłania nowej wiadomości */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">✉️ Wyślij wiadomość do pracownika</h2>

        <form onSubmit={handleSend} className="space-y-4">
          <input
            type="text"
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            placeholder="Imię i nazwisko lub email"
            className="w-full border px-4 py-2 rounded text-sm"
            required
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Wpisz wiadomość..."
            className="w-full border px-4 py-2 rounded text-sm h-28 resize-none"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
          >
            <Send size={16} /> Wyślij wiadomość
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;