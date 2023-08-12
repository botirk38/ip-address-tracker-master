import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';

dotenv.config();
console.log(process.env.API_KEY); // This should print your API key

const app = express();
const port = 3001;
app.use(cors());


const API_KEY = process.env.API_KEY;
console.log(API_KEY)



app.get('/getGeoData', async (req, res) => {
  try {
    const ip = req.query.ip; // Get IP from request query parameters
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`);
    console.log(response.data)
    res.json(response.data); // Send data back to the client
  } catch (error) {
    console.error('Error Details:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
