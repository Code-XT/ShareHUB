"use client";
import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { QRCodeSVG } from "qrcode.react";

const Shortener = () => {
  const [url, setUrl] = useState("");
  const [keyValue, setKeyValue] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = () => {
    if (url.trim() === "" || keyValue.trim() === "") {
      alert("Please enter a URL and a key to shorten and encrypt");
      return;
    }

    // Encrypt the URL with the key
    const encryptedUrl = CryptoJS.AES.encrypt(url, keyValue).toString();

    // Construct the shortened URL
    const shortened = `https://share-hub-pi.vercel.app/${encodeURIComponent(
      encryptedUrl
    )}`;
    setShortenedUrl(shortened);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000); // Reset copied state after 3 seconds
  };

  return (
    <div className="min-h-screen flex place-items-start py-10 justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">URL Encrypter</h2>
        <div className="mb-4">
          <label className="block mb-2">URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Key:</label>
          <input
            type="text"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleShorten}
          className="w-full py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          Shorten & Encrypt
        </button>

        {shortenedUrl && (
          <div className="mt-4">
            <p className="mb-2">Encrypted URL:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={shortenedUrl}
                readOnly
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="ml-2 py-2 px-4 bg-green-600 rounded hover:bg-green-700 transition duration-200"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <QRCodeSVG
              value={shortenedUrl}
              size={200}
              className="mt-4 mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Shortener;
