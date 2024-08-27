import http from "http";
import WebSocket from "ws";

const PORT = 8080;
const DB = { message: "The DB is a lie!", voteMetter: 0 };

const server = http.createServer(function (req, res) {
  console.log("server: request");

  DB.voteMetter += 1;

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ voteMetter: DB.voteMetter }));
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket connection established");

  ws.send("Welcome! You are now connected.");

  ws.on("message", (message) => {
    DB.voteMetter += 1;
    console.log(`Received: ${String(message)}`);

    ws.send(DB.voteMetter);
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
