import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export const sendPDF = async (req, res) => {
  const { email } = req.body;
  const pdfFile = req.file;

  if (!email || !pdfFile) {
    return res.status(400).json({ error: 'Email or PDF file is missing' });
  }

  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fahadnoor6677@gmail.com', // Replace with your email
        pass: 'asfschool123',  // Replace with your email password
      },
    });

    // Mail options
    const mailOptions = {
      from: 'fahadnoor6677@gmail.com',
      to: email,
      subject: 'Your Certificate',
      text: 'Please find attached your course completion certificate.',
      attachments: [
        {
          filename: 'certificate.pdf',
          path: path.join(__dirname, pdfFile.path),
          contentType: 'application/pdf',
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Delete the uploaded file after sending
    fs.unlinkSync(path.join(__dirname, pdfFile.path));

    res.status(200).json({ message: 'PDF sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send PDF' });
  }
};
