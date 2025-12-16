# Email Setup Guide for Contact Form

## Setup Instructions for EmailJS

Your contact form is now integrated with EmailJS to send emails directly to **samij7141@gmail.com**. Follow these steps to complete the setup:

### Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier allows 200 emails/month)

### Step 2: Create an Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Note your **Service ID** (you'll need this later)

### Step 3: Create an Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: Portfolio Contact: {{subject}}

Message:
From: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note your **Template ID**

### Step 4: Get Your Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** and copy it

### Step 5: Update the Code
Open `js/script.js` and replace these three placeholders:

**Line 169:** Replace `YOUR_PUBLIC_KEY` with your EmailJS Public Key
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

**Line 188:** Replace `YOUR_SERVICE_ID` with your Service ID
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

**Line 188:** Replace `YOUR_TEMPLATE_ID` with your Template ID
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
```

### Example:
```javascript
emailjs.init("abc123xyz"); // Your Public Key
emailjs.send('service_12345', 'template_67890', { // Your IDs
    from_name: formData.name,
    from_email: formData.email,
    subject: formData.subject,
    message: formData.message,
    to_email: 'samij7141@gmail.com'
})
```

### Step 6: Test the Form
1. Open your website
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email inbox at **samij7141@gmail.com**

## Features Included:
- ✅ Form validation
- ✅ Loading spinner while sending
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Direct link to email if service fails
- ✅ Animations and visual feedback

## Important Notes:
- The free tier of EmailJS allows 200 emails per month
- Your email (samij7141@gmail.com) is hardcoded as the recipient
- The form includes client-side validation
- Users will see a message if the email fails to send

## Troubleshooting:
- Make sure all IDs are correctly replaced in `js/script.js`
- Check browser console for any errors (F12)
- Verify your EmailJS account is active
- Check your email service connection in EmailJS dashboard

## Alternative: Simple Mailto Link
If you prefer not to use EmailJS, you can also use a simple mailto link as a fallback. The form already includes error handling that mentions emailing directly.











