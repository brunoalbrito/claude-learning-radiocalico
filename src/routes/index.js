const express = require('express');
const router = express.Router();
const { backendGet, backendPost } = require('../api');

const METADATA_URL = 'https://d3d4yli4hf5bmh.cloudfront.net/metadatav2.json';

router.get('/metadata', async (req, res) => {
  try {
    const response = await fetch(METADATA_URL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Metadata unavailable', detail: err.message });
  }
});

router.get('/ping-backend', async (req, res) => {
  try {
    const data = await backendGet('/api/ping');
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Backend unreachable', detail: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const data = await backendGet('/api/users');
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Backend unreachable', detail: err.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    const data = await backendPost('/api/users', req.body);
    res.status(201).json(data);
  } catch (err) {
    const status = err.message.includes('409') ? 409 : err.message.includes('400') ? 400 : 502;
    res.status(status).json({ error: err.message });
  }
});

module.exports = router;
