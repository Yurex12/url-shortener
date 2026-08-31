const form = document.querySelector('#url-form');
const input = document.querySelector('#url-input');
const error = document.querySelector('#error');
const resultContainer = document.querySelector('#result-container');
const result = document.querySelector('#result');
const copyButton = document.querySelector('#copy-button');
const submitButton = document.querySelector('#submit-button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = 'Shortening...';
  submitButton.classList.add('loading');

  error.classList.add('hidden');
  resultContainer.classList.add('hidden');

  try {
    const response = await fetch('/api/urls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: input.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      error.textContent = data.message;
      error.classList.remove('hidden');
      return;
    }

    result.href = data.shortUrl;
    result.textContent = data.shortUrl;
    resultContainer.classList.remove('hidden');

    copyButton.textContent = 'Copy';
  } catch {
    error.textContent = 'Something went wrong. Please try again.';
    error.classList.remove('hidden');
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Shorten';
    submitButton.classList.remove('loading');
  }
});

copyButton.addEventListener('click', async () => {
  await navigator.clipboard.writeText(result.textContent);

  copyButton.textContent = 'Copied!';

  setTimeout(() => {
    copyButton.textContent = 'Copy';
  }, 1500);
});
