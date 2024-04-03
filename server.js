import express from 'express';
const app = express();
const port = 3001; 

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    next();
});

app.get('/api/coin/:symbol', async (req, res) => {
    const { symbol } = req.params;
    const apiKey = 'd07a4409-d124-4765-ba4d-607ddeb0964c';
    const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${symbol}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-CMC_PRO_API_KEY': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});