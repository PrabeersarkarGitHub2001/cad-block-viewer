import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import BlockList from "./components/BlockList";
import BlockDetails from "./components/BlockDetails";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadForm />} />
        <Route path="/blocks" element={<BlockList />} />
        <Route path="/blocks/:id" element={<BlockDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
