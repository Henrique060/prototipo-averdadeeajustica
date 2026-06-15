import express from "express";
import path from "path";
import compression from "compression";

const app = express();

// 1. Define __dirname FIRST so the lines below can use it
const __dirname = new URL('.', import.meta.url).pathname;

// 2. Enable compression next
app.use(compression());

// 3. Serve your static files once (removed the duplicate line)
app.use(express.static(path.join(__dirname, "dist"), { acceptRanges: false }));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});