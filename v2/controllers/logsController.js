const express = require("express");
const app = express();

const logs = require("../../models/log");


app.get("/logs", (req, res) => {
  res.send(`
    <ul>
        ${logs.map((log, idx) => `<li><a href="/v2/logs/${idx}">${log.title} </a></li>`).join("")}
    </ul>
  `);
});

app.get("/logs/:logIndex", (req, res) => {
  const log = logs[req.params.logIndex];
  if (log) {
    res.send(`
        <div>
            <h1>${log.title}</h1>
            <p>${log.post}</p>
            <span>${log.captainName}</span>
            <a href="/v2/logs">
                <button>Back to All Logs</button>
            </a>
        </div>
    `);
  } else {
    res.status(404).send("<span>Log not found</span>");
  }
});

module.exports = app;