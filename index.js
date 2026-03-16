import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT;

app.use(express.static("dist"));

// Serve index.html for all non-file routes (SPA fallback)
app.get('/*sany', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});