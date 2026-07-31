const jwt = require('jsonwebtoken');

// Single shop-owner admin, credentials come from env vars (no user DB table).
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const validEmail = email === process.env.ADMIN_EMAIL;
  const validPassword = password === process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
}

module.exports = { login };
