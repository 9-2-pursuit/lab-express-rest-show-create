const express = require("express");
const app = express();

const logs = require("../../models/log");

app.get("/logs", (req, res) => {
  res.send(`
<ul>
 ${logs
   .map(
     (log, idx) =>
       `<li>
        <a href="/v2/logs/${idx}">${log.title}</a>
     </li>`
   )
   .join("")}
</ul>`);
});

app.get("/logs/:logIndex", (req, res) => {
  const matchingLog = logs[req.params.logIndex];

  if (matchingLog) {
    res.send(`
    <div>
        <h1 >${matchingLog.title}</h1>
        <p>${matchingLog.post}</p>
        <span>${matchingLog.captainName}</span>
        <a href="/v2/logs">
            <button>Back to All Logs</button>
        </a>
    </div>`);
    res.send(matchingLog);
  } else {
    res.status(404).send("<span>Log Not Found</span>");
  }
});

module.exports = app;
