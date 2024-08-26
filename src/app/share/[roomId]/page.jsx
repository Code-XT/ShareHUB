"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSocket } from "@/SocketContext";

const CHUNK_SIZE = 64 * 1024; // 64 KB

const Room = ({ params: { roomId } }) => {
  const socket = useSocket();
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    // Join the room
    socket.emit("joinRoom", { roomId });

    // Listen for incoming files
    socket.on("fileReceived", (file) => {
      console.log("File received:", file);
      setFiles((prevFiles) => [...prevFiles, file]);
    });

    // Listen for progress updates
    socket.on("progressUpdate", ({ fileName, progress }) => {
      if (fileName === currentFile?.fileName) {
        setUploadProgress(progress);
      }
    });

    return () => {
      socket.off("fileReceived");
      socket.off("progressUpdate");
    };
  }, [socket, roomId, currentFile]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && socket) {
      setCurrentFile({ fileName: file.name });
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = new Uint8Array(reader.result);
        console.log("Sending file:", file.name);
        sendFileInChunks(fileData, file.name);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const sendFileInChunks = (fileData, fileName) => {
    const totalChunks = Math.ceil(fileData.byteLength / CHUNK_SIZE);
    let chunksSent = 0;

    for (let i = 0; i < totalChunks; i++) {
      const chunk = fileData.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      socket.emit("sendFileChunk", {
        fileName,
        chunk: Array.from(chunk),
        chunkIndex: i,
        totalChunks,
        roomId,
      });
      chunksSent++;
      const progress = Math.round((chunksSent / totalChunks) * 100);
      socket.emit("progressUpdate", { fileName, progress, roomId });
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-items-start pt-20 bg-black text-white">
      <h1 className="text-4xl font-sans text-gray-500 mb-4">
        Share Room: {roomId}
      </h1>

      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <div
          className="border-2 border-dashed border-gray-600 p-6 text-center cursor-pointer"
          onClick={handleFileSelect}
        >
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            ref={fileInputRef}
          />
          <p className="text-gray-400">Click to select a file</p>
        </div>

        <div className="mt-6 space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded border-gray-700 bg-gray-900"
            >
              <p className="truncate">{file.fileName}</p>
              <a
                href={`data:application/octet-stream;base64,${file.fileData}`}
                download={file.fileName}
                className="text-blue-400 hover:underline"
              >
                Download
              </a>
            </div>
          ))}
        </div>
      </div>

      {currentFile && (
        <div className="mt-4 w-full max-w-md">
          <div className="h-2 bg-gray-700 rounded">
            <div
              className="h-full bg-blue-500 rounded"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2">
            {currentFile.fileName}: {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Room;
