"use client";
import CreateRoom from "@/components/CreateRoom";
import JoinRoomID from "@/components/JoinRoomID";
import { useState } from "react";

const Share = () => {
  const [showJoin, setShowJoin] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <>
      {showJoin ? (
        <JoinRoomID />
      ) : showCreate ? (
        <CreateRoom />
      ) : (
        <div className="flex space-x-4">
          <button
            className="bg-blue-600 border-2 rounded-full p-10 text-white hover:opacity-50"
            onClick={() => setShowCreate(true)}
          >
            Create
          </button>
          <button
            className="bg-yellow-300 border-2 rounded-full p-10 text-black hover:opacity-50"
            onClick={() => setShowJoin(true)}
          >
            Join
          </button>
        </div>
      )}
    </>
  );
};

export default Share;
