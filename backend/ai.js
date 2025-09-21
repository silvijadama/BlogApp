const axios = require("axios");

const API_KEY = "AIzaSyCrQqNfarkdAkaRkGd1fBwMqKtcvvbkHxo"; // replace with your actual key

async function callGemini(prompt) {
    try {
        const response = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt,
                            },
                        ],
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-goog-api-key": API_KEY,
                },
            }
        );

        console.log(response.data);
        // console.log('content' + response.data.candidates?.[0].content);
        // console.log('content: ' + JSON.stringify(response.data.candidates?.[0].content, null, 2));

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}

module.exports =  callGemini;
