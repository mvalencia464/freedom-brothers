import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_Bp3P7wiT_LrfBvfH11wGQoHq8QGfhHbkL');

app.use(cors());
app.use(express.json());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/waitlist', async (req, res) => {
  const { email, type } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Remote Contractor System <onboarding@resend.dev>', // Use the testing domain or a verified domain if available
      to: [email],
      subject: `Welcome to the ${type === 'mastermind' ? 'Mastermind' : 'Remote Retreat'} Waitlist`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1>You're on the list!</h1>
          <p>Thanks for your interest in the <strong>${type === 'mastermind' ? 'Mastermind' : 'Remote Retreat'}</strong>.</p>
          <p>We've secured your spot on the waitlist and will notify you as soon as doors open.</p>
          <hr />
          <p style="font-size: 12px; color: #888;">Remote Contractor System • 2026</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'Email sent successfully', data });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
