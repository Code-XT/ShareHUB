"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Chat() {
  const [socket, setSocket] = useState(undefined);
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", ({ message }) => {
        setMessageList([...messageList, message]);
      });
    }
  });

  const handleSubmit = () => {
    socket.emit("message", { message, roomName });
    setMessage("");
  };

  const handleJoin = () => {
    socket.emit("join", { roomName });
  };
  return (
    <main className="flex min-h-screen flex-col pt-20">
      <div>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          placeholder="Room Name"
          className="border border-gray-300 rounded p-2 mx-5 text-black"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Message"
          className="border border-gray-300 rounded p-2 text-black"
        />
        <button
          onClick={handleSubmit}
          className="border border-gray-300 rounded p-2 mx-5 my-2"
        >
          Send Message
        </button>
        <button
          onClick={handleJoin}
          className="border border-gray-300 rounded p-2 my-2"
        >
          Join Room
        </button>
      </div>

      <div className="flex flex-col items-center justify-center pt-10">
        <h1 className="text-4xl font-bold">Chat</h1>

        <div className="flex flex-col items-center justify-center">
          {messageList?.map((message) => (
            <div
              className="border border-gray-300 rounded p-2 my-2"
              key={message}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
