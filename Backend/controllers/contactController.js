import { sendContactEmail } from '../utils/emailService.js';

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address' 
      });
    }

    // Send email using the email service
    const emailSent = await sendContactEmail(name, email, subject, message);
    
    if (!emailSent) {
      return res.status(500).json({ 
        message: 'Failed to send email. Please try again later.' 
      });
    }

    res.status(200).json({ 
      message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ 
      message: 'Internal server error. Please try again later.' 
    });
  }
}; 