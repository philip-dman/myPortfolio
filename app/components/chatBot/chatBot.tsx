"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiChatAiFill } from "react-icons/ri";
import { sendMessageToChatbot } from "./chatbotActions";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);

    // Scroll to the last message when reopening the chat
    if (!isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const userMessage = { sender: "user", text: inputValue };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");

      try {
        const botMessage = {
          sender: "bot",
          text: (await sendMessageToChatbot(inputValue)).output,
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error communicating with the server:", error);
        const errorMessage = {
          sender: "bot",
          text: "Sorry, I couldn't process your message.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      // Scroll to the last message when the chat is opened
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  return (
    <div>
      {/* Floating Chat Bubble */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        animate={{
          scale: [1],
          rotate: [-50, 30, -15, 40, -15, 5, 0],
          transition: { duration: 1.5, repeat: Infinity, repeatDelay: 3 },
        }}
        className="fixed bottom-5 right-5 bg-blue-500 text-white w-18 h-18 rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50"
        onClick={toggleChatBox}
      >
        <RiChatAiFill className="text-4xl" />
      </motion.div>

      {/* Chat Box */}
      {isOpen && (
        <motion.div
          className="fixed md:bottom-25 md:right-5 bottom-0 right-0 backdrop-blur-md bg-opacity-70 md:w-100 md:h-3/4 w-full h-full rounded-lg shadow-2xl z-50 flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="backdrop-blur-md bg-opacity-70 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-bold">AI ChatBot</h3>
            <button
              className="text-white hover:text-gray-300"
              onClick={toggleChatBox}
            >
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat ${
                  message.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    message.sender === "user"
                      ? "chat-bubble-primary text-right"
                      : "chat-bubble-secondary bg-blue-500 text-left"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-300 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
