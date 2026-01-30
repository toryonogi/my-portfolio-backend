const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  console.log('--- 送信リクエストを受信しました ---');
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // 自分宛に届く
    subject: `【ポートフォリオ】${name}様よりお問い合わせ`,
    text: `お名前: ${name}\nメールアドレス: ${email}\n\n内容:\n${message}`,
  };

  try {
    console.log('メール送信を開始します...');
    // 実際に送信を待機
    const info = await transporter.sendMail(mailOptions);
    console.log('メール送信に成功しました！ ID:', info.messageId);
    res.status(200).json({ success: true, message: '送信完了' });
  } catch (error) {
    // エラー内容を詳しくログに出す
    console.error('!!! 送信エラー詳細 !!!');
    console.error('エラーコード:', error.code);
    console.error('メッセージ:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
