const socket = new WebSocket("ws://localhost:8080");

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
  socket.send("hey you!");
});
