import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Log() {
  const { index } = useParams();
  const [log, setLog] = useState(null);
  useEffect(() => {
    fetch(`/logs/${index}`)
      .then((res) => res.json())
      .then((data) => setLog(data));
  }, []);
  console.log(log);
  return (
    <div>
      <h1>{log && log.title}</h1>
      <p>{log && log.post}</p>
      <a href="/">Back to home</a>
    </div>
  );
}
