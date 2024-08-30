import https from "node:https";
import WebSocket from "ws";
import fs from "node:fs";
import path from "node:path";
console.log("Hello pm2 how are you today?");

const PORT = 3443;
const VOTES_LIMIT = 25; // votes that can be cast before the counter is stopped.
const DB = {
  message: "The DB is a lie!",
  voteMetter: 0,
  statistics: {
    connections: 0,
    votesAdd: 0,
    votesSub: 0,
  },
};

const options = {
  key: fs.readFileSync(path.join(__dirname, "../cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../cert", "cert.pem")),
};

const server = https.createServer(options, function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ data: DB }));
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  DB.statistics.connections++;

  ws.on("message", (rawData) => {
    let value = -1;
    try {
      let buffer = rawData.valueOf() as Buffer;
      value = buffer.readUInt8(0);
    } catch (error) {
      return;
    }

    if (value > 1 || value < 0) return;

    console.log(`==> Vote received: ${value}/${DB.voteMetter}`);

    if (value === 1) {
      DB.statistics.votesAdd++;

      if (DB.voteMetter < VOTES_LIMIT) {
        DB.voteMetter += 1;
      }
    } else if (value === 0) {
      DB.statistics.votesSub++;
      if (DB.voteMetter <= -1 * VOTES_LIMIT) {
        DB.voteMetter -= 1;
      }
    }

    const view = new Int8Array(new ArrayBuffer(1));
    view[0] = DB.voteMetter;
    ws.send(view);
  });

  ws.on("error", (err) => {
    console.log(`WebSocket error: ${err.message}`);
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
