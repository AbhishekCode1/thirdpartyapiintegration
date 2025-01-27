import "./App.css";
import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import axios from "axios";
//https://dev.bitly.com/api-reference/#createBitlink
function App() {
  const [shortenedLink, setShortenedLink] = useState("");
  const [userInput, setUserInput] = useState("");

  const accessToken = "c7e1b2013c510609905c5025e36cdb645efc0b40";

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        {
          long_url: userInput
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      );
      setShortenedLink(response.data.link);
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="container h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-medium text-blue-500 mb-4">
          Our <span className="text-yellow-400">URL Shortener</span>
        </h1>
        <div>
          <input
            className="outline-none border-2 border-blue-500 rounded-md backdrop-blur-xl bg-white/20 shadow-md px-3 py-3"
            type="text"
            placeholder="Enter link to be shortened"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 text-white px-8 py-3 ml-4 rounded-md"
            onClick={fetchData}
          >
            Submit URL
          </button>
        </div>
        <div className="mt-5">
          {shortenedLink && (
            <>
              <p>{shortenedLink}</p>
              <CopyToClipboard text={shortenedLink}>
                <button className="border-2 border-blue-500 text-blue-500 font-medium px-5 py-2 ml-4 rounded-md">
                  Copy URL to Clipboard
                </button>
              </CopyToClipboard>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
