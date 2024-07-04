"use client";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "@/SocketContext";

export default function CreateRoom() {
  const generateRoomId = () => {
    const getRandomPart = () =>
      Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
    return `${getRandomPart()}-${getRandomPart()}-${getRandomPart()}`;
  };

  const roomId = useRef(generateRoomId());
  const socket = useSocket();
  const router = useRouter();

  const handleCreate = () => {
    navigator.clipboard.writeText(`${roomId.current}`).then(() => {
      toast.success(`Room ID copied to clipboard`, {
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
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit("createRoom", { roomId: roomId.current });

    socket.on("redirectToShare", (data) => {
      router.push(`/share/${data.roomId}`);
    });

    return () => {
      socket.off("redirectToShare");
    };
  }, [socket, router]);

  return (
    <div className="flex flex-col items-center mt-10 space-y-8">
      <div className="text-3xl text-white text-center">
        Share Room ID
        <div className="font-mono mt-2 text-lg">{roomId.current}</div>
      </div>
      <QRCodeSVG
        value={`http://localhost:3000/share/${roomId.current}`}
        size={200}
        style={{ margin: "0 auto" }}
      />
      <button
        className="px-6 py-3 mt-4 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-700"
        onClick={handleCreate}
      >
        Share
      </button>

      <ToastContainer />
    </div>
  );
}
