
const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const cors = require("cors");

const app = express();
app.use(cors()); // allow frontend to call this backend

app.get("/categories", (req, res) => {
    request("https://en.uptodown.com/android/games", (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            const categories = [];

            $(".links ul a").each((index, element) => {
                const name = $(element).text().trim()
                const url = $(element).attr("href");
                categories.push({name, url});
            });

            res.json(categories); // send categories to frontend
        } else {
            res.status(500).json({ error: "Failed to scrape" });
        }
    });
});

app.get("/games", (req, res) =>{
    const categoryUrl = req.query.url

    request(categoryUrl, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            const gameCards = []
            $(".content .item").each((index, element) => {
                const title = $(element).find(".name").text().trim()
                const img = $(element).find("figure img.app_card_img").attr("src")
                gameCards.push({title, img})
            })
            res.json(gameCards)
        } else {
            res.status(500).json({ error: "Failed to scrape" })
        }
    })
})

app.listen(2500, () => {
    console.log("Server running on http://localhost:2500");
});

