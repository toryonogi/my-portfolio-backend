const express = require('express');
const { Resend } = require('resend'); // resendに変更
const cors = require('cors');
require('dotenv').config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY); // APIキーを使用

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    console.log('Resendでメール送信を開始します...');
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // 最初はこのまま
      to: process.env.EMAIL_USER, // あなたのGmail
      subject: `【ポートフォリオ】${name}様より`,
      text: `名前: ${name}\nメアド: ${email}\n内容: ${message}`,
    });

    console.log('送信成功:', data);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('送信エラー:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(process.env.PORT || 3000);
