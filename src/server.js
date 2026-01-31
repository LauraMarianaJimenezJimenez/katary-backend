require('dotenv').config();
const express = require('express');
const cors = require('cors');

const db = require('./db');
const formsRoutes = require('./routes/forms');
const downloadsRoutes = require('./routes/downloads');
const validateAccess = require('./middleware/validateAccess');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(validateAccess);

// Test DB connection (solo para pruebas)
db.query('SELECT NOW()')
  .then(res => console.log('DB OK:', res.rows[0]))
  .catch(err => console.error('DB ERROR:', err));

// Routes
app.use('/api', formsRoutes);
app.use('/api', downloadsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
