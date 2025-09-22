# Whois Domain Lookup Application

A full-stack web application that provides comprehensive domain registration and contact information using the WhoisXMLAPI service.

## Features

- **Domain Information**: Get registrar, registration/expiration dates, domain age, and hostnames
- **Contact Information**: Retrieve registrant, technical, and administrative contact details
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error handling with user-friendly messages
- **Real-time Lookup**: Fast domain information retrieval

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Styling**: CSS3 with gradient backgrounds and animations
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v14 or higher)
- WhoisXMLAPI account and API key

## Setup Instructions

### 1. Get API Key
1. Sign up at [WhoisXMLAPI.com](https://www.whoisxmlapi.com/)
2. Navigate to [My Products](https://user.whoisxmlapi.com/products) page
3. Copy your API key

### 2. Backend Setup
```bash
# Clone the repository
git clone <repository-url>
cd tlv300-app 

# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file and add your API key
WHOIS_API_KEY=your_api_key_here
PORT=5000

# Start the server
npm start
# Or for development with auto-reload
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev

```

## Deployment Instructions
