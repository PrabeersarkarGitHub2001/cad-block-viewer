import React, { useEffect, useState } from "react";
import axios from "axios";
import BlockDetails from "./BlockDetails";

const BlockList = () => {
  const [blocks, setBlocks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBlocks(page, searchTerm);
  }, [page]);

  const fetchBlocks = async (pageNum, search = "") => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blocks?page=${pageNum}&limit=10&search=${search}`);
      setBlocks(res.data.blocks);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching blocks:", err);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchBlocks(1, searchTerm);
  };

  const handleRowClick = (block) => {
    setSelectedBlock(block);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Extracted Blocks</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search block name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Block Name</th>
            <th>X</th>
            <th>Y</th>
            <th>File ID</th>
          </tr>
        </thead>
        <tbody>
          {blocks.map((block) => (
            <tr key={block.id} onClick={() => handleRowClick(block)} style={{ cursor: "pointer" }}>
              <td>{block.id}</td>
              <td>{block.name}</td>
              <td>{block.x}</td>
              <td>{block.y}</td>
              <td>{block.fileId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 1rem" }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>

      {selectedBlock && (
        <div style={{ marginTop: "2rem" }}>
          <BlockDetails block={selectedBlock} />
        </div>
      )}
    </div>
  );
};

export default BlockList;
