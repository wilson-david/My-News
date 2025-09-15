require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const KEY = process.env.API_KEY;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/top_headlines', async (req, res) => {
    const {country = 'us'} = req.query;

    let url = `https://newsapi.org/v2/top-headlines?apiKey=${KEY}`
    
    if(country){
        url += `&country=${country}`;
    }

    try {
        const response = await fetch(url);
        const posts = await response.json();

    // ✅ Si no hay artículos, devuelve un array vacío, pero con status 200
        if (!posts.articles || posts.articles.length === 0) {
        return res.status(200).json({
            status: "ok",
            totalResults: 0,    
            articles: []
        });
        }
        res.json(posts);
    } catch (error) {
        console.error("Error en /top_headlines:", error);
        res.status(500).json({ error: 'Error al obtener los posts' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});