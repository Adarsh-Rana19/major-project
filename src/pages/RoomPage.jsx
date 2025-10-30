import React from "react";
import NotePanel from "../components/NotePanel";
import CodeEditor from "../components/CodeEditor";
import Terminal from "../components/Terminal";
import VideoPanel from "../components/VideoPanel";
import { useParams } from "react-router-dom";

const RoomPage = () => {
  const { roomId } = useParams();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Note Area */}
      <div className="w-1/5 border-r bg-white p-2">
        <NotePanel />
      </div>

      {/* Center Code Editor */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
          <h2 className="font-semibold">Room: {roomId}</h2>
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
            Run Code
          </button>
        </div>
        <CodeEditor />
        <Terminal />
      </div>

      {/* Right Video/User Panel */}
      <div className="w-1/5 border-l bg-white p-2">
        <VideoPanel />
      </div>
    </div>
  );
};

export default RoomPage;
