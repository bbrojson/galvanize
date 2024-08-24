import http from "http";

let soHowDoseItWorkQuestionMark = 0;

const server = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  ++soHowDoseItWorkQuestionMark;
  res.end(JSON.stringify({ soHowDoseItWorkQuestionMark }));
});

server.listen(3000, () => {
  //Message to print on the console after a successful run
  console.log("Server running on port 3000");
});
