```javascript
import nodemailer from 'nodemailer';

const sendEmailAlert = async (recipient, subject, message) => {
  // Transporter configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use a well-known service or configure your own SMTP server
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASSWORD, // Your email password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipient, // List of recipients
    subject: subject, // Subject line
    text: message, // Plain text body
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email: %s', error);
  }
};

export { sendEmailAlert };
```