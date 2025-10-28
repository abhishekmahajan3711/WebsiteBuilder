# Email Setup Guide

## Prerequisites

1. Install nodemailer:
```bash
npm install nodemailer
```

## Gmail Setup (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification

### Step 2: Generate App Password
1. Go to Google Account settings
2. Security > 2-Step Verification > App passwords
3. Select "Mail" as the app
4. Generate the password
5. Copy the generated 16-character password

### Step 3: Environment Variables
Create a `.env` file in the Backend directory with:

```env
# Database
MONGO_URI=mongodb://localhost:27017/website_builder

# JWT Secret
JWT_SECRET=your_jwt_secret_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

## Alternative Email Providers

### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

### Custom SMTP Server
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.yourprovider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## Testing

1. Start your backend server
2. Try the forgot password feature
3. Check your email for the reset link
4. Check console logs for any errors

## Troubleshooting

### Common Issues:

1. **"Invalid login" error**
   - Make sure you're using an App Password, not your regular password
   - Ensure 2FA is enabled

2. **"Less secure app access" error**
   - Use App Passwords instead of regular passwords
   - Don't enable "less secure app access"

3. **Email not sending**
   - Check console logs for detailed error messages
   - Verify environment variables are set correctly
   - Ensure your email provider allows SMTP access

### Debug Mode
To see detailed email logs, add this to your emailService.js:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  debug: true, // Enable debug output
  logger: true  // Log to console
});
```

## Security Notes

- Never commit your `.env` file to version control
- Use App Passwords instead of regular passwords
- Consider using environment-specific email configurations
- Implement rate limiting for password reset requests 