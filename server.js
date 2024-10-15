import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = "ANkk4Wkl79eXuPCuir1cQ0t6hi4An2HZ";

app.use(cors());

app.get("/news", async (req, res) => {
    try {
        const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching data from New York Times API", error: error.message });
    } 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });