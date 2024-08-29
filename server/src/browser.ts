// const socket = new WebSocket("ws://57.128.201.101:80");
const socket = new WebSocket("ws://localhost:80");

socket.addEventListener("open", function () {
  console.log("handshake");

  socket.send("Hello Server!");
});

socket.addEventListener("message", function (event) {
  console.log("Message from server: ", event.data);
});

socket.addEventListener("close", function () {
  console.log("Disconnected from WS Server");
});

socket.addEventListener("error", function (event) {
  console.error("WS Connection Error: ", event);
});

window.addEventListener("click", () => {
  const view = new Uint8Array(new ArrayBuffer(1));
  view[0] = 1;
  console.log("send:", view);
  socket.send(view);
});
