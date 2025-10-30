import React from "react";

const NotePanel = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Shared Notes</h3>
      <textarea
        className="w-full h-[80vh] border p-2 rounded"
        placeholder="All participants can edit this note..."
      ></textarea>
    </div>
  );
};

export default NotePanel;
