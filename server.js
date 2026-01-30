require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  console.log('--- 送信リクエストを受信しました ---');
  console.log('受信データ:', req.body);

  const { name, email, message } = req.body;

  // 設定確認ログ
  console.log('使用するメールアドレス:', process.env.EMAIL_USER);
  console.log(
    'パスワード設定の有無:',
    process.env.EMAIL_PASS ? '設定あり' : '設定なし',
  );

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // 465番ポートの場合はここをtrueにします
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // 以下の3行を追加：接続が切れないようにする魔法のオプション
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000, // 10秒待つ
    greetingTimeout: 10000,
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `【テスト】${name}様より`,
    text: `名前: ${name}\nメール: ${email}\nメッセージ: ${message}`,
  };

  try {
    console.log('メール送信を開始します...');
    const info = await transporter.sendMail(mailOptions);
    console.log('メール送信に成功しました！ ID:', info.messageId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log('!!! エラーが発生しました !!!');
    console.error('エラー名:', error.name);
    console.error('メッセージ:', error.message);
    console.error('スタックトレース:', error.stack);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
