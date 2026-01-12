import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email, type } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email is required' }) };
    }

    const { data, error } = await resend.emails.send({
      from: 'Remote Contractor System <onboarding@resend.dev>',
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
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully', data }),
    };
  } catch (err) {
    console.error('Server Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
