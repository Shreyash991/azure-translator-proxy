const express = require('express');
const axios = require('axios');
const { validateTranslateSingle, validateTranslateMultiple, validateDetectLanguage } = require('../utils/sanitize');
const router = express.Router();

// Translate single text
router.post('/translate-single', validateTranslateSingle, async (req, res) => {
  const { text, toLanguage } = req.body;

  try {
    const response = await axios.post(
      `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=${toLanguage}`,
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
          'Content-Type': 'application/json',
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error translating text:', error.message);
    res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
});

// Translate multiple texts
router.post('/translate-multiple', validateTranslateMultiple, async (req, res) => {
  const { texts, toLanguage } = req.body;

  try {
    const response = await axios.post(
      `${process.env.AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&to=${toLanguage}`,
      texts.map((text) => ({ Text: text })),
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
          'Content-Type': 'application/json',
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error translating texts:', error.message);
    res.status(500).json({ error: 'Translation failed. Please try again.' });
  }
});

// Detect language of a single text
router.post('/detect-language', validateDetectLanguage, async (req, res) => {
  const { text } = req.body;

  try {
    const response = await axios.post(
      `${process.env.AZURE_TRANSLATOR_ENDPOINT}/detect?api-version=3.0`,
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
          'Content-Type': 'application/json',
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error detecting language:', error.message);
    res.status(500).json({ error: 'Language detection failed. Please try again.' });
  }
});

// Get supported languages
router.get('/supported-languages', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.AZURE_TRANSLATOR_ENDPOINT}/languages?api-version=3.0`,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching supported languages:', error.message);
    res.status(500).json({ error: 'Failed to fetch supported languages. Please try again.' });
  }
});

module.exports = router;

