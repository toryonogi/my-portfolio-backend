document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // 1. ボタンを無効化（二重送信防止）
      const submitBtn = contactForm.querySelector('button');
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中...';

      // 2. フォームデータ取得
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        // 3. Backendサーバーへ送信
        const response = await fetch(
          'https://my-portfolio-backend-5zic.onrender.com/send-email',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        const result = await response.json();

        if (response.ok && result.success) {
          alert('メールを送信しました！');
          contactForm.reset();
        } else {
          alert('サーバーエラー: ' + (result.error || '送信に失敗しました。'));
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        alert('サーバーが起動していないか、接続できませんでした。');
      } finally {
        // 4. ボタンを元に戻す
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
      }
    });
  }
});
