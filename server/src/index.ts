import http from "node:http";
import WebSocket from "ws";

console.log("Hello pm2 how are you today?");

const PORT = 8080; // 3443;
const VOTES_LIMIT = 25; // votes that can be cast before the counter is stopped.
const DB = {
  message: "The DB is a lie!",
  voteMeter: 0,
  statistics: {
    connections: 0,
    votesAdd: 0,
    votesSub: 0,
  },
};

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ data: DB }));
});

const wss = new WebSocket.Server({ server });

function broadcast(msg: Int8Array) {
  wss.clients.forEach(function each(client) {
    client.send(msg);
  });
}

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

    console.log(`==> Vote received: ${value}/${DB.voteMeter}`);

    if (value === 1) {
      DB.statistics.votesAdd++;

      if (DB.voteMeter < VOTES_LIMIT) {
        DB.voteMeter += 1;
      }
    } else if (value === 0) {
      DB.statistics.votesSub++;
      if (DB.voteMeter > -1 * VOTES_LIMIT) {
        DB.voteMeter -= 1;
      }
    }

    const view = new Int8Array(new ArrayBuffer(1));
    view[0] = DB.voteMeter;
    broadcast(view);
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
