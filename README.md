# Todo Summary Assistant

A full-stack application that allows users to manage todos and generate AI-powered summaries using Groq's LLM, with Slack integration.

## Features

- Create, edit, and delete todos
- Generate AI-powered summaries of pending todos using Groq's LLM
- Send summaries directly to Slack
- Modern UI with Chakra UI
- Real-time updates

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)
- LLM: Groq API
- UI: Chakra UI
- Hosting: Vercel (frontend), Render (backend)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Slack workspace with webhook URL
- Groq API key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   GROQ_API_KEY=your_groq_api_key
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   PORT=3001
   ```

4. Start the backend server:
   ```bash
   node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Add new todos using the input field
3. Delete todos by clicking the delete icon
4. Click "Generate & Send Summary to Slack" to create an AI summary and send it to your Slack channel

## Environment Variables

- `GROQ_API_KEY`: Your Groq API key
- `SLACK_WEBHOOK_URL`: Your Slack incoming webhook URL
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase API key
- `PORT`: Backend server port (default: 3001)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request