export default function home({ logs }) {
  return (
    <div className="home">
      {logs &&
        logs.map((log, i) => (
          <div key={i}>
            <h1>{log.title}</h1>
            <p>{log.post}</p>
            <a href={"/log/" + i}>go to log</a>
          </div>
        ))}
    </div>
  );
}
