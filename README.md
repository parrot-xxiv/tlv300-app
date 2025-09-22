# Whois Domain Lookup Application

A full-stack web application that provides domain registration and contact information using the WhoisXMLAPI service.

>Temporarily live and deployed to: [https://https://tlv300-app.vercel.app](https://tlv300-app.vercel.app/)


## Features

- **Domain Information**: Get registrar, registration/expiration dates, domain age, and hostnames
- **Contact Information**: Retrieve registrant, technical, and administrative contact details
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful error handling with user-friendly messages
- **Real-time Lookup**: Fast domain information retrieval

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vite + React.js
- **Styling**: TailwindCSS + Shadcn Components
- **HTTP Client**: Axios

## Prerequisites

- Node.js (v22 or higher)
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

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev

```

## Vercel Dashboard Deployment

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub/GitLab/Bitbucket

### 2. Deploy Backend
1. **Import Project**
   - Click "New Project"
   - Import your repository
   - Select directory: `backend`

2. **Configure Build Settings**
   - Framework Preset: "Other"
   - Select: `Express`
   - Output Directory: leave empty
   - Install Command: `npm install`

3. **Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `WHOIS_API_KEY` with your API key value
   - Add `ORIGIN` with the URL of your frontend

4. **Deploy**
   - Click "Deploy"
   - Note the deployment URL (e.g., `https://your-backend.vercel.app`)

### 3. Deploy Frontend
1. **Import Frontend Project**
   - Click "New Project"
   - Import frontend repository
   - Framework Preset: `Vite`
   - Choose defaults

2. **Environment Variables (if needed)**
   - Go to Project Settings → Environment Variables
   - Add `WHOIS_API_KEY` with `https://your-backend.vercel.app`

3. **Deploy**
   - Click "Deploy"
   - Your app will be live at the provided URL


### 5. Custom Domain (Optional)
- Project Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

The dashboard automatically handles builds, deployments, and SSL certificates.