import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

const API_KEY = "AIzaSyAsndoGdHcrFdlQsoA-i1pghUT7gAzsrKU";
const MODEL = "gemini-2.0-flash";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "👋 Hey there! Ask me anything, I’m here to help!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${URL}?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: input }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const botResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ I couldn't generate a response. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", text: botResponse }]);
    } catch (err) {
      console.error("Chatbot API Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            "⚠️ The chatbot service is temporarily unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chatbot Floating Icon */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-white border-2 border-dashed border-gray-400 text-gray-700 rounded-full w-14 h-14 shadow-md flex items-center justify-center hover:scale-105 transition-all z-50"
        whileTap={{ scale: 0.9 }}
      >
        {open ? <FaTimes size={22} /> : <FaRobot size={26} />}
      </motion.button>

      {/* Collapsible Chat Window */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-24 right-6 w-80 max-h-[450px] bg-white border-2 border-dashed border-gray-400 rounded-2xl shadow-lg flex flex-col overflow-hidden z-50"
        >
          {/* Header */}
          <div className="bg-gray-100 border-b border-gray-300 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRobot className="text-gray-600" />
              <h3 className="font-semibold text-gray-700 text-sm">Virtual Guide</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto px-3 py-2 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ whiteSpace: "pre-wrap", overflowX: "hidden" }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded-lg text-sm max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-gray-800 text-white self-end ml-auto"
                    : "bg-gray-100 text-gray-800 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <p className="text-gray-500 text-xs italic">Thinking...</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center border-t border-gray-300 p-2 bg-gray-50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="ml-2 bg-gray-800 text-white p-2 rounded-lg hover:bg-gray-700 transition-all"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Chatbot;
