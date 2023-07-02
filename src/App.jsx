import "./App.css";
import { Divider, Typography } from "antd";
import UploadCard from "./components/UploadCard";
import useQuery from "./hooks/useQuery";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

const { Title } = Typography;
function App() {
  const { query, loading } = useQuery();
  const [loadFirst, setLoadFirst] = useState(false);
  const [loadSecond, setLoadSecond] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
