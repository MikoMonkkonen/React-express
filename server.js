const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

const express = require('express'); 
const app = express(); 
const port = process.env.PORT || 5000; 
const url = 'https://api.porssisahko.net/v1/latest-prices.json';

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get(`/get_prices`, async (req, res) => {
    try {
      const response = await fetch(url);

      const apiData = await response.json();

      const priceData = apiData.prices

      if (!Array.isArray(priceData)) {
        throw new Error('API did not return array')
      }

      const muutettuData = priceData.map(item => {
        return `${item.price} - ${item.startDate} - ${item.endDate} `;
      })
      console.log(muutettuData);
      res.send ({prices: muutettuData})
    } catch (error) {
      console.error('error fetching prices', error);
      res.status(500).json({error: `Internal Server Error.`});
    }
    
});
