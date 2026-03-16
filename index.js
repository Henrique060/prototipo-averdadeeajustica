import express from 'express';
const app = express();


// Use the port assigned to you, or default to 5001
const PORT = 3000;


app.get("/", async (req, res) => {
    res.end(JSON.stringify({ message: "Hello World" }));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 