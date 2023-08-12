const axios = require("axios");


exports.handler = async function (event, context) {
  try {
    const ip = event.queryStringParameters.ip;
    const API_KEY = process.env.API_KEY; 
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`);
    
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error); // Log the full error
    return {
      statusCode: 500,
      body: `An error occurred: ${error.message}`, // Include the error message in the response
    };
  }
  
  }
