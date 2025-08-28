document.addEventListener('DOMContentLoaded', function() {
  let originalUserUrl = '';

  const linkInput = document.getElementById('link');
  const generatedLink = document.getElementById('generated-link');
  const error = document.getElementById('error');
  const successMsg = document.getElementById('success-message');
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', savedTheme);

  function handleLinkGeneration(url, excludeUrl = null) {
    
    const loader = document.getElementById('loader');
    const result = document.getElementById('result');
    const generatedLink = document.getElementById('generated-link');
    const error = document.getElementById('error');

    loader.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';

    let fetchUrl = 'https://anten.xo.je/nimbaha.php?url=' + encodeURIComponent(url);
    if (excludeUrl) {
        fetchUrl += '&exclude=' + encodeURIComponent(excludeUrl);
    }

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            if (data.status === 'success') {
              const ll=data.download_url;
              
                generatedLink.textContent = ll;
                result.style.display = 'block';

            } else {
                error.textContent = 'خطا در تولید لینک: ' + (data.message || 'مشکلی پیش آمد.');
                error.style.display = 'block';
            }
        })
        .catch(err => {
            loader.style.display = 'none';
            error.textContent = 'خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید.';
            error.style.display = 'block';
            console.error(err);
        });
}

  function generateLink() {
      if (!linkInput.value || !linkInput.value.startsWith('http')) {
          error.textContent = 'لطفاً یک لینک معتبر وارد کنید.';
          error.style.display = 'block';
          return;
      }
      originalUserUrl = linkInput.value;
      handleLinkGeneration(originalUserUrl);
  }

  function copyToClipboard() {
      navigator.clipboard.writeText(generatedLink.textContent).then(() => {
          successMsg.style.display = 'block';
          setTimeout(() => { successMsg.style.display = 'none'; }, 2000);
      });
  }

  function downloadLink() {
      window.open(generatedLink.textContent, '_blank');
  }

  function checkHalfPrice() {
      const checkUrl = `https://linkirani.ir/?url=${encodeURIComponent(generatedLink.textContent)}`;
      window.open(checkUrl, '_blank');
  }

  linkInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') generateLink(); });

  document.getElementById('popup-box').addEventListener('click', function(e) {
      if (e.target === this) this.style.display = 'none';
  });
  function openTelegramBot() {
    window.open('https://t.me/+F-lE6YwVGNY5OGQ0', '_blank');
    }

  // دکمه‌ها را به توابع متصل کن
  document.querySelector('.btn-telegram').onclick = openTelegramBot;
  document.querySelector('.btn-primary').onclick = generateLink;
  document.querySelector('.copy-btn').onclick = copyToClipboard;
  document.querySelector('.btn-download').onclick = downloadLink;
  document.querySelector('.btn-check-half').onclick = checkHalfPrice;
});
