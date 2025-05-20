const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Routes
app.get('/todos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/todos', async (req, res) => {
  try {
    const { title } = req.body;
    const { data, error } = await supabase
      .from('todos')
      .insert([{ title, completed: false }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH endpoint to mark as completed
app.patch('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const { data, error } = await supabase
      .from('todos')
      .update({ completed })
      .eq('id', id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/summarize', async (req, res) => {
  try {
    // Get all todos
    const { data: todos, error } = await supabase
      .from('todos')
      .select('*');

    if (error) throw error;

    const pending = todos.filter(t => !t.completed);
    const completed = todos.filter(t => t.completed);

    const pendingList = pending.length
      ? pending.map(t => `• ${t.title}`).join('\n')
      : 'None';
    const completedList = completed.length
      ? completed.map(t => `• ${t.title}`).join('\n')
      : 'None';

    const prompt = `Summarize my todos.\nPending:\n${pendingList}\nCompleted:\n${completedList}`;

    // Call Groq API
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: prompt
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    if (!groqResponse.data.choices?.[0]?.message?.content) {
      throw new Error('No response from Groq API');
    }

    const summary = groqResponse.data.choices[0].message.content;

    // Try to send to Slack
    let slackStatus = 'failed';
    try {
      if (!process.env.SLACK_WEBHOOK_URL) {
        throw new Error('Slack webhook URL is not configured');
      }

      const slackMessage = {
        text: `📝 Todo Summary:\n\n${summary}`
      };

      console.log('Attempting to send to Slack...');
      const slackResponse = await axios.post(process.env.SLACK_WEBHOOK_URL, slackMessage);
      console.log('Slack response:', slackResponse.status);
      
      if (slackResponse.status === 200) {
        slackStatus = 'sent';
        console.log('Successfully sent to Slack');
      } else {
        throw new Error(`Slack returned status ${slackResponse.status}`);
      }
    } catch (slackError) {
      console.error('Failed to send to Slack:', {
        message: slackError.message,
        response: slackError.response?.data,
        status: slackError.response?.status
      });
      slackStatus = 'failed';
    }

    // Return the summary and Slack status
    res.json({ 
      summary,
      slackStatus
    });
  } catch (error) {
    console.error('Error in summarize endpoint:', error);
    console.error('Error details:', error.response?.data);
    res.status(500).json({ 
      error: error.message || 'Failed to generate summary',
      details: error.response?.data || 'No additional details available'
    });
  }
});

// POST /summary alias for /summarize
app.post('/summary', async (req, res) => {
  req.url = '/summarize';
  app._router.handle(req, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 