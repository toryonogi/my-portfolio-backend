const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', function (event) {
  // 1. ページのリロード（元の動き）を止める
  event.preventDefault();

  // 2. フォームを隠して、メッセージを出す
  contactForm.classList.add('hidden');
  successMessage.classList.remove('hidden');
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message'); // ここでメッセージ要素を取得

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button');
      submitBtn.disabled = true;
      submitBtn.textContent = '送信中...';

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('https://my-portfolio-backend-5zic.onrender.com/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // ★ ここで「alert」の代わりに画面を切り替える！
          contactForm.classList.add('hidden'); // フォームを隠す
          successMessage.classList.remove('hidden'); // メッセージを出す
          contactForm.reset();
        } else {
          alert('サーバーエラー: ' + (result.error || '送信に失敗しました。'));
        }
      } catch (error) {
        console.error('Fetch Error:', error);
        alert('サーバーに接続できませんでした。');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '送信する';
      }
    });
  }
});
