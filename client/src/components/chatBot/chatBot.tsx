import "../../index.css";
import { useEffect, useRef, useState } from "react";
import { RiChatAiFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      setMessages([...messages, inputValue]);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {/* Floating Chat Bubble */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className="fixed bottom-5 right-5 bg-neutral-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer z-50"
        onClick={toggleChatBox}
      >
        <RiChatAiFill className="text-3xl" />
      </motion.div>

      {/* Chat Box */}
      {isOpen && (
        <motion.div
          className="fixed bottom-20 right-5 bg-base-200 w-80 h-96 rounded-lg shadow-2xl z-50 flex flex-col"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-neutral-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-bold">Ai ChatBot</h3>
            <button
              className="text-white hover:text-gray-300"
              onClick={toggleChatBox}
            >
              <IoClose className="text-lg" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className="chat chat-end chat-bubble chat-bubble-primary place-self-end"
              >
                {message}
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
