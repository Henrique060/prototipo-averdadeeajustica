import express from "express";
import path from "path";
import compression from "compression"; // 1. Add this import

const app = express();

app.use(compression()); // 2. Add this line BEFORE your static paths
app.use(express.static(path.join(__dirname, "dist")));
const __dirname = new URL('.', import.meta.url).pathname;

app.use(express.static(path.join(__dirname, "dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});