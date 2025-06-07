import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import axios from 'axios';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:4173',
  credentials: true
}));
const server = http.createServer(app);
const io = new Server(server);

// Structured logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const user = req.user ? req.user.username : 'anonymous';
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} user=${user} status=${res.statusCode} duration=${duration}ms`);
  });
  next();
});

// Basic rate limiting (per IP)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
}));

// Standardized error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR`, err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

app.use(express.json());
const upload = multer();

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// JWT authentication middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    // Only decode, don't verify signature here (optionally verify if you have the secret)
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Proxy /transcribe to audio-processing (protected)
app.post('/transcribe', authenticateJWT, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // Forward file to audio-processing
    const formData = new FormData();
    formData.append('file', new Blob([req.file.buffer]), req.file.originalname);
    // Optionally: pass user context downstream
    formData.append('user_context', JSON.stringify({ username: req.user.username }));
    const response = await axios.post('http://audio-processing:8000/transcribe', formData, {
      headers: formData.getHeaders ? formData.getHeaders() : {},
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message || 'Audio processing failed' });
  }
});

// Proxy /fetch-trends to trend-analysis (unprotected for dev)
app.post('/fetch-trends', async (req, res) => {
  try {
    const response = await axios.post('http://trend-analysis:8001/fetch-trends', req.body, {
      headers: req.headers // forward auth header
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message || 'Trend scraping failed' });
  }
});

// Proxy /trends to trend-analysis (unprotected for dev)
app.get('/trends', async (req, res) => {
  try {
    const response = await axios.get('http://trend-analysis:8001/trends', {
      headers: req.headers,
      params: req.query
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message || 'Fetching trends failed' });
  }
});

// Proxy /analyze to trend-analysis (protected)
app.post('/analyze', authenticateJWT, async (req, res) => {
  try {
    const { transcription, confidence, user_context } = req.body;
    if (!transcription) return res.status(400).json({ error: 'transcription required' });
    // Merge JWT user context with provided context
    const mergedContext = Object.assign({}, user_context || {}, { username: req.user.username });
    const response = await axios.post('http://trend-analysis:8001/analyze', {
      transcription,
      confidence: confidence || 1.0,
      user_context: mergedContext
    });
    res.json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message || 'Trend analysis failed' });
  }
});

// WebSocket support
io.on('connection', (socket) => {
  console.log('WebSocket client connected');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
