import { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home.jsx";
import Log from "./components/Log.jsx";

function App() {
  const [logs, setLogs] = useState(null);

  useEffect(() => {
    fetch("/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);
  console.log(logs);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home logs={logs} />} />
          <Route path="/log/:index" element={<Log />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
