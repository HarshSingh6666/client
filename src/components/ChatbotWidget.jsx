import React, { useState, useRef, useEffect } from "react";
import "./ChatbotWidget.css";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "👋 Hello! How can I help you with farming today?" },
  ]);
  const [input, setInput] = useState("");
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  // 👇 yeh ref add kiya
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Text-to-Speech function (same as before)
  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    if (!isSpeakerOn) {
      window.speechSynthesis.cancel();
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const hasHindi = /[\u0900-\u097F]/.test(text);
    utterance.lang = hasHindi ? "hi-IN" : "en-US";

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (hasHindi) {
        const hindiVoice = voices.find((v) => v.lang.includes("hi-IN"));
        if (hindiVoice) utterance.voice = hindiVoice;
      } else {
        const englishVoice = voices.find((v) => v.lang.includes("en-US"));
        if (englishVoice) utterance.voice = englishVoice;
      }
    }

    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // ✅ Handle sending message to backend
  const handleSend = async (customInput = null) => {
    const finalInput = customInput || input.trim();
    if (finalInput === "") return;

    const userMessage = { from: "user", text: finalInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setMessages((prev) => [...prev, { from: "bot", text: "🤖 Thinking..." }]);

    try {
      const res = await fetch("https://krisisaathi-backend.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: finalInput }),
      });

      const data = await res.json();
      const botReply = data.result || "❌ No reply from server.";

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: botReply },
      ]);

      speakText(botReply);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { from: "bot", text: "⚠️ Sorry, I couldn't reach the server." },
      ]);
    }
  };

  // ✅ Voice Recognition Function (same as before)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("🎤 Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onerror = (event) => console.error("Speech Recognition Error:", event.error);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            🌱 KrisiSaathi
            <div className="chat-controls">
              <button
                className="speaker-btn"
                onClick={() => {
                  setIsSpeakerOn((prev) => {
                    const newState = !prev;
                    if (!newState) window.speechSynthesis.cancel();
                    return newState;
                  });
                }}
                title={isSpeakerOn ? "Speaker On" : "Speaker Off"}
              >
                {isSpeakerOn ? "🔊" : "🔇"}
              </button>

              <button
                className={`mic-btn ${isListening ? "listening" : ""}`}
                onClick={startListening}
                title="Speak your question"
              >
                🎤
              </button>

              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ✖
              </button>
            </div>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-msg ${msg.from === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.text}
              </div>
            ))}
            {/* 👇 Yeh hamesha last me scroll karega */}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={() => handleSend()}>➤</button>
          </div>
        </div>
      )}

      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "−" : "💬"}
      </button>
    </div>
  );
};

export default ChatbotWidget;
