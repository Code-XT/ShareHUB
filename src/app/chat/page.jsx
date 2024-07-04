"use client";
import { useEffect, useState } from "react";
import { useSocket } from "@/SocketContext";

export default function Chat() {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", ({ message }) => {
      setMessageList([...messageList, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const handleSubmit = () => {
    if (message.trim()) {
      socket.emit("message", { message, roomId: roomName });
      setMessage("");
    }
  };

  const handleJoin = () => {
    if (roomName.trim()) {
      socket.emit("join", { roomId: roomName });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-20 text-black">
      <div className="flex flex-col items-center w-full max-w-md">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          placeholder="Room Name"
          className="border border-gray-300 bg-slate-300 rounded p-2 mb-4 w-full text-black"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Message"
          className="border border-gray-300 bg-slate-300 rounded p-2 mb-4 w-full text-black"
        />
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
          <button
            onClick={handleJoin}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Join Room
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center pt-10 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-4">Chat</h1>
        <div className="w-full bg-gray-100 p-4 rounded shadow-md">
          {messageList.length > 0 ? (
            messageList.map((msg, index) => (
              <div className="border-b border-gray-300 py-2" key={index}>
                {msg}
              </div>
            ))
          ) : (
            <div className="text-gray-500">No messages yet</div>
          )}
        </div>
      </div>
    </main>
  );
}
