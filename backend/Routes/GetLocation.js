const express = require('express');
//const fetch = require('node-fetch');
const router = express.Router();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


const OPENCAGE_API_KEY = '6d25a086bed3419f9a6e3652fefadeb9'; // 🔁 Replace with your actual API key

router.post('/getlocation', async (req, res) => {
  const { latlong } = req.body;

  if (!latlong || !latlong.lat || !latlong.long) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latlong.lat}+${latlong.long}&key=${OPENCAGE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.results && data.results.length > 0) {
      const formatted = data.results[0].formatted;
      return res.json({ location: formatted });
    } else {
      return res.status(500).json({ error: 'Unable to fetch address' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;