const express = require('express');
const path = require('path');
const app = express();

// Use the port assigned to you, or default to 5001
const PORT = 5001;

// 1. Serve the static files from your React 'dist' folder
// Make sure you run 'npm run build' first to create this folder!
app.use(express.static(path.join(__dirname, 'dist')));

// 2. Add your API routes here
app.get('/api/status', (req, res) => {
    res.json({ status: "Server is running on port 5001" });
});

// 3. The "Catch-all" route
// If a user refreshes the page or types a URL, send them index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is active at http://localhost:${PORT}`);
});