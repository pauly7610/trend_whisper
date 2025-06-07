import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());

// Structured logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const user = req.user ? req.user.username : 'anonymous';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} user=${user} status=${res.statusCode} duration=${duration}ms`);
  });
  next();
});

// Standardized error handler
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ERROR`, err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@postgres:5432/trendwhisper',
});
const JWT_SECRET = process.env.JWT_SECRET || 'trendwhisper-secret';

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Register endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  try {
    const userCheck = await pool.query('SELECT 1 FROM users WHERE username = $1', [username]);
    if (userCheck.rowCount > 0) return res.status(409).json({ error: 'User already exists' });
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashed]);
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rowCount === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// JWT authentication middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Admin middleware: only allow 'admin' user
function isAdmin(req, res, next) {
  if (req.user && req.user.username === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
}

// Admin: List all users
app.get('/admin/users', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const result = await pool.query('SELECT username FROM users');
    res.json({ users: result.rows.map(u => u.username) });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Admin: Delete user
app.delete('/admin/users/:username', authenticateJWT, isAdmin, async (req, res) => {
  const { username } = req.params;
  if (username === 'admin') return res.status(400).json({ error: 'Cannot delete admin user' });
  try {
    const result = await pool.query('DELETE FROM users WHERE username = $1 RETURNING username', [username]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: `User ${username} deleted` });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// Protected route example
app.get('/me', authenticateJWT, (req, res) => {
  const { username } = req.user;
  res.json({ user: { username } });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`User Management service running on port ${PORT}`);
});
