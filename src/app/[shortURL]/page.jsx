"use client";

import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { retrieveEncryptedURL } from "@/db/retrieve";

const ShortURL = ({ params: { shortURL } }) => {
  const [keyValue, setKeyValue] = useState("");
  const [error, setError] = useState("");

  const handleRedirect = async () => {
    let decodedUrl = "";
    if (shortURL.toString().length === 6) {
      decodedUrl = await retrieveEncryptedURL(shortURL);
    } else {
      decodedUrl = decodeURIComponent(shortURL);
    }
    try {
      // Decrypt the URL with the provided key
      const bytes = CryptoJS.AES.decrypt(decodedUrl, keyValue);
      const originalUrl = bytes.toString(CryptoJS.enc.Utf8);

      if (!originalUrl) {
        throw new Error("Invalid key or corrupted data");
      }

      // Ensure the original URL has a protocol
      const hasProtocol = /^https?:\/\//i.test(originalUrl);
      const redirectUrl = hasProtocol ? originalUrl : `http://${originalUrl}`;

      // Redirect to the original URL
      console.log(originalUrl);
      window.location.href = redirectUrl;
    } catch (err) {
      setError("Failed to decrypt URL. Please check the key and try again.");
    }
  };

  return (
    <div className="min-h-screen flex place-items-start py-10 justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">
          Enter Key to Decrypt and Redirect
        </h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter Key"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleRedirect}
          className="py-2 px-4 bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          Decrypt & Redirect
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default ShortURL;
