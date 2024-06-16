// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Ensure this port matches your fetch request

app.use(cors());
app.use(bodyParser.json());

app.post('/api/sendMessage', (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  // Here you would handle the logic for processing the message
  // For now, we'll just return a static response
  res.json({ reply: `You said: ${message}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
