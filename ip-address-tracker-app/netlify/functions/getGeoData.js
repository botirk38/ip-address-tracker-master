const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const ip = event.queryStringParameters.ip;
    const API_KEY = process.env.API_KEY; // Make sure to define this in your Netlify environment variables
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'An error occurred',
    };
  }
};
