import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send("Only POST allowed");

  const { name, email, phone, address, size, payment } = req.body;

  // 👇 এখানে তোমার Gmail আইডি ও App Password বসাও
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'YOUR_GMAIL@gmail.com',
      pass: 'YOUR_APP_PASSWORD'  // Gmail App Password লাগে (2FA on থাকলে)
    },
  });

  const mailOptions = {
    from: email,
    to: 'YOUR_GMAIL@gmail.com',
    subject: 'নতুন অর্ডার এসেছে',
    text: `
নাম: ${name}
ইমেইল: ${email}
মোবাইল: ${phone}
ঠিকানা: ${address}
সাইজ: ${size}
পেমেন্ট: ${payment}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('✅ অর্ডার পাঠানো হয়েছে!');
  } catch (error) {
    res.status(500).send('❌ অর্ডার পাঠানো যায়নি! ' + error.message);
  }
}
