import React, { useState } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("// Start coding here");

  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      className="flex-1 w-full p-4 font-mono bg-gray-900 text-white resize-none"
    />
  );
};

export default CodeEditor;
