import express from "express";
import path from "path";

const app = express();
const __dirname = new URL('.', import.meta.url).pathname;

// 1. Serve static files FIRST
app.use(express.static(path.join(__dirname, "dist")));

// 2. IMPORTANT: SPA fallback LAST
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});