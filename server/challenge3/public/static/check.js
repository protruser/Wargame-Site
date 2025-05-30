document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', async () => {
        const code = document.getElementById('code').value;

        const res = await fetch('/check-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
        });

        const result = await res.json();

        if (result.success) {
            location.href = result.redirect;
        } else {
            document.getElementById('error').innerText = result.message;
        }
    });
});
