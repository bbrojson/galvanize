import http from "http";
import WebSocket from "ws";

console.log("Hello pm2 how are you today?");

const PORT = 80;
const DB = { message: "The DB is a lie!", voteMetter: 0 };

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify({ voteMetter: DB.voteMetter }));
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established: ", ws);

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
      DB.voteMetter += 1;
    } else if (value === 0) {
      DB.voteMetter -= 1;
    }

    const view = new Uint8Array(new ArrayBuffer(1));
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
