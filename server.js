import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5001;

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Serve the static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Example API Route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the Express Backend" });
});

// 3. Essential for React Router: 
// Redirect all other requests to index.html so React can handle the routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});