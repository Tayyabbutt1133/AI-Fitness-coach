import React, { useState } from "react";
import { ClipboardCopy } from "lucide-react";

const CoachAdvice = ({ coachingadvice }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coachingadvice);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!coachingadvice) return null;

  return (
    <div className="max-w-2xl mx-auto p-6 my-4 shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-2xl text-center font-semibold mb-2">
        Coaching Advice
      </h2>
      <div className="flex justify-end my-4">
        <button
          onClick={handleCopy}
          className="mt-4 px-4 flex justify-center items-center cursor-pointer  py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 space-x-2"
        >
          <ClipboardCopy size={18} />
          <span>{isCopied ? "Copied!" : "Copy Advice"}</span>
        </button>
      </div>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-xl text-gray-800 overflow-auto leading-relaxed text-base">
        {coachingadvice.split("\n").map((line, index) => (
          <p key={index} className="mb-2">
            {line.startsWith("•") ? (
              <span className="text-blue-600 font-semibold">{line}</span>
            ) : (
              <span>{line}</span>
            )}
          </p>
        ))}
      </pre>
    </div>
  );
};

export default CoachAdvice;
