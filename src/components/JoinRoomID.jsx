"use client";
import { useSocket } from "@/SocketContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function JoinRoomID() {
  const [roomName, setRoomName] = useState("");
  const socket = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.on("redirectToShare", (data) => {
      router.push(`/share/${data.roomId}`);
    });

    socket.on("error", (data) => {
      toast.error(data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });

    return () => {
      socket.off("redirectToShare");
      socket.off("error");
    };
  }, [socket, router]);

  const handleJoin = () => {
    if (roomName.trim()) {
      socket.emit("joinRoom", { roomId: roomName });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        className="border border-gray-300 rounded p-2 w-64 text-black"
        placeholder="Room Number"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleJoin()}
      />
      <button
        onClick={handleJoin}
        className="bg-green-600 text-white border border-green-600 rounded p-2 w-64 hover:bg-green-700"
      >
        Join
      </button>
      <ToastContainer />
    </div>
  );
}
