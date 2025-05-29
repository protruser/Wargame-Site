function verifyCode() {
    const code = document.getElementById('code').value;
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');

    resultEl.textContent = '';
    errorEl.textContent = '';

    fetch('/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                resultEl.textContent = `🎉 FLAG: ${data.flag}`;
            } else {
                errorEl.textContent = data.message;
            }
        })
        .catch((err) => {
            errorEl.textContent = 'server error';
        });
}
