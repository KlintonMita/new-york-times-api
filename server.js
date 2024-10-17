import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
const API_KEY = "ANkk4Wkl79eXuPCuir1cQ0t6hi4An2HZ";

app.use(cors());

app.get("/news", async (req, res) => {
    try {
        const searchQuery = req.query.q ? req.query.q.toLowerCase() : ''; 
        const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;

        const response = await axios.get(url);
        let articles = response.data.results; 

        console.log("Fetched Articles:", articles); 

        if (searchQuery) {
            articles = articles.filter(article => {
                const titleMatch = article.title && article.title.toLowerCase().includes(searchQuery);
                const abstractMatch = article.abstract && article.abstract.toLowerCase().includes(searchQuery);
                
              
                console.log(`Title: ${article.title}, Match: ${titleMatch}, Abstract: ${article.abstract}, Match: ${abstractMatch}`);
                
                return titleMatch || abstractMatch;
            });

            console.log("Filtered Articles:", articles); 
        }

        if (articles.length === 0) {
            return res.status(200).json({ message: "No matches found" });
        }

        res.json({ results: articles });
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).json({ message: "Error fetching data from New York Times API", error: error.message });
    } 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
