
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    // 1. --- Security: Only allow POST requests ---
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        // Return error
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'Bad Request: Missing required fields.' });
    }


    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10), 
        secure: parseInt(process.env.SMTP_PORT, 10) === 465, 
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
                                                    
        replyTo: email,
        to: process.env.SMTP_USER,                  
                                                    
        subject: `Website Contact Form: ${subject}`,
        text: `You received a new message from your website contact form:\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n\n` +
              `Subject: ${subject}\n\n` +
              `Message:\n${message}`,              
        html: `<p>You received a new message from your website contact form:</p>
               <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
                 <li><strong>Subject:</strong> ${subject}</li>
               </ul>
               <p><strong>Message:</strong></p>
               <p>${message.replace(/\n/g, '<br>')}</p>`, 
    };

    try {
        await transporter.sendMail(mailOptions);

        console.log(`Email sent successfully from ${email}`);
        return res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        console.error('Error sending email:', error);

        let userErrorMessage = 'There was a problem sending your message. Please try again later.';
        if (error.code === 'EAUTH') {
            userErrorMessage = 'Server authentication failed. Please check configuration.';
        } else if (error.code === 'ECONNREFUSED' || error.code === 'ECONNRESET') {
             userErrorMessage = 'Could not connect to email server. Please check configuration.';
        }

        return res.status(500).json({ message: userErrorMessage });
    }
}