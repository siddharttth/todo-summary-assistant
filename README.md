# Todo Summary Assistant

A sleek, minimalist todo application with AI-powered summary generation and Slack integration.

## Features

- Create, manage, and track your tasks
- Filter tasks by active and completed status
- Generate AI-powered summaries of your tasks
- Send summaries directly to Slack

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

### Backend Setup

1. Clone the repository
   ```
   git clone https://github.com/siddharttth/todo-summary-assistant.git
   cd todo-summary-assistant
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3001
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   GROQ_API_KEY=your_groq_api_key
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   ```

4. Start the backend server
   ```
   npm start
   ```

### Frontend Setup

1. Open a new terminal window/tab
2. Install frontend dependencies
   ```
   cd frontend
   npm install
   ```

3. Start the frontend development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` to use the application

### Setting up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project and note down the project URL
3. Navigate to Project Settings > API to find your:
   - Project URL (SUPABASE_URL)
   - Project API Key (SUPABASE_KEY) - use the "anon" public key
4. Set up your database table:
   - In the Supabase dashboard, go to the SQL Editor
   - Create a new query and paste the following SQL:
   ```sql
   CREATE TABLE todos (
     id SERIAL PRIMARY KEY,
     title TEXT NOT NULL,
     completed BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );
   ```
   - Run the query to create the table

### Getting a Groq API Key

1. Create an account at [groq.com](https://console.groq.com)
2. Once logged in, navigate to the API Keys section
3. Generate a new API key
4. Copy the key and add it to your `.env` file as `GROQ_API_KEY`

### Setting up Slack Webhook

1. Log in to your Slack workspace
2. Go to [api.slack.com/apps](https://api.slack.com/apps)
3. Click "Create New App" > "From scratch"
4. Give your app a name and select your workspace
5. In the left sidebar, click on "Incoming Webhooks"
6. Toggle "Activate Incoming Webhooks" to On
7. Click "Add New Webhook to Workspace"
8. Select the channel where you want to receive todo summaries
9. Copy the Webhook URL provided
10. Add it to your `.env` file as `SLACK_WEBHOOK_URL`

## Deployment

To deploy the application to a production environment:

### Backend Deployment

1. Ensure all environment variables are set in your production environment
2. Build the backend:
   ```
   cd backend
   npm install --production
   ```
3. Start the backend server:
   ```
   node server.js
   ```

### Frontend Deployment

1. Build the frontend for production:
   ```
   cd frontend
   npm run build
   ```
2. Deploy the contents of the `dist` folder to your web server or hosting service

## Troubleshooting

- If you encounter CORS issues, ensure your backend allows requests from your frontend domain
- Check your `.env` file to ensure all variables are correctly set
- Verify your Supabase table is correctly configured with the proper fields
- Make sure your Slack webhook URL is active and pointing to the correct channel
