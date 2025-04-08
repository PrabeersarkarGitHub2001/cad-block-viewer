import React from "react";

const BlockDetails = ({ block }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
      <h3>Block Details</h3>
      <p><strong>ID:</strong> {block.id}</p>
      <p><strong>Name:</strong> {block.name}</p>
      <p><strong>X:</strong> {block.x}</p>
      <p><strong>Y:</strong> {block.y}</p>
      <p><strong>File ID:</strong> {block.fileId}</p>
      {/* Add more fields if available */}
    </div>
  );
};

export default BlockDetails;
