const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.ORIGIN || 'http://localhost:5173'
}));
app.use(express.json());

// Whois API endpoint
const WHOIS_API_URL = 'https://www.whoisxmlapi.com/whoisserver/WhoisService';

// Helper function to calculate domain age
const calculateDomainAge = (createdDate) => {
  if (!createdDate) return 'Unknown';

  const created = new Date(createdDate);
  const now = new Date();
  const diffTime = Math.abs(now - created);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''}`;
  }
  return `${months} month${months !== 1 ? 's' : ''}`;
};

// Helper function to truncate hostnames
const truncateHostnames = (hostnames) => {
  if (!hostnames || hostnames.length === 0) return 'N/A';

  const hostnameString = hostnames.join(', ');
  if (hostnameString.length <= 25) return hostnameString;

  return hostnameString.substring(0, 22) + '...';
};

// Helper function to extract both domain and contact information
const extractWhoisData = (whoisData) => {
  const whoisRecord = whoisData.WhoisRecord || {};
  const registryData = whoisRecord.registryData || {};

  const registrant = whoisRecord.registrant || registryData.registrant || {};
  const technicalContact = whoisRecord.technicalContact || registryData.technicalContact || {};
  const administrativeContact = whoisRecord.administrativeContact || registryData.administrativeContact || {};

  return {
    // Domain Information
    domainName: whoisRecord.domainName || 'N/A',
    registrar: whoisRecord.registrarName || registryData.registrarName || 'N/A',
    registrationDate: whoisRecord.createdDate || registryData.createdDate || 'N/A',
    expirationDate: whoisRecord.expiresDate || registryData.expiresDate || 'N/A',
    estimatedDomainAge: calculateDomainAge(whoisRecord.createdDate || registryData.createdDate),
    hostnames: truncateHostnames(whoisRecord.nameServers?.hostNames || registryData.nameServers?.hostNames || []),

    // Contact Information
    registrantName: registrant.name || 'N/A',
    technicalContactName: technicalContact.name || 'N/A',
    administrativeContactName: administrativeContact.name || 'N/A',
    contactEmail: registrant.email || technicalContact.email || administrativeContact.email || 'N/A'
  };
};

// Main endpoint for domain lookup
app.post('/api/whois', async (req, res) => {
  try {
    const { domainName } = req.body;

    if (!domainName) {
      return res.status(400).json({
        error: 'Domain name is required'
      });
    }

    if (!process.env.WHOIS_API_KEY) {
      return res.status(500).json({
        error: 'API key not configured'
      });
    }

    // Make request to Whois API
    const response = await axios.post(WHOIS_API_URL, {
      domainName: domainName.trim(),
      apiKey: process.env.WHOIS_API_KEY,
      outputFormat: 'JSON'
    }, {
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const whoisData = response.data;

    // Check if domain was found
    if (!whoisData.WhoisRecord) {
      return res.status(404).json({
        error: 'Domain information not found'
      });
    }

    const result = extractWhoisData(whoisData);
    res.json(result);

  } catch (error) {
    console.error('Whois lookup error:', error.message);

    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({
        error: 'Request timeout - please try again'
      });
    }

    if (error.response?.status === 401) {
      return res.status(401).json({
        error: 'Invalid API key'
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded - please try again later'
      });
    }

    res.status(500).json({
      error: 'Failed to fetch domain information'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Replace app.listen with module.exports for Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;