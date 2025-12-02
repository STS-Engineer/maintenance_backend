const express = require('express');
const cors = require('cors');
const maintenancerouter = require('./services/maintenanceservice');

const app = express();

// ----------------------
// CORS Middleware
// ----------------------
// Allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// ----------------------
// Body Parser
// ----------------------
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// ----------------------
// Routes
// ----------------------
app.use('/ajouter', maintenancerouter);

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
