import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Server Up!");
});

app.listen(8080, () => {
  console.log("Server is Up!");
});
