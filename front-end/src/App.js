import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

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
      {logs &&
        logs.map((log, i) => (
          <div>
            <h1>{log.title}</h1>
            <p>{log.post}</p>
            <a href={"/logs/" + i}>go to log</a>
          </div>
        ))}
    </div>
  );
}

export default App;
