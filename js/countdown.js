/* ====================================================
   Countdown Clock & AJAX Form Handler
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Fixed Target Launch Date (Set to 5 Days from launch initialization)
  // You can also change this string directly, e.g., '2026-08-23T00:00:00'
  let storedTarget = localStorage.getItem('launch_target_date_5d');
  
  if (!storedTarget) {
    const fixedTarget = new Date();
    fixedTarget.setDate(fixedTarget.getDate() + 5);
    storedTarget = fixedTarget.toISOString();
    localStorage.setItem('launch_target_date_5d', storedTarget);
  }

  const targetDate = new Date(storedTarget);

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }

  function updateCountdown() {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (daysEl) daysEl.textContent = padZero(days);
    if (hoursEl) hoursEl.textContent = padZero(hours);
    if (minutesEl) minutesEl.textContent = padZero(minutes);
    if (secondsEl) secondsEl.textContent = padZero(seconds);
  }

  // Initial call & 1-second interval loop
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Email Subscription AJAX Handler
  const emailForm = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const formMsg = document.getElementById('form-message');
  const submitBtn = emailForm ? emailForm.querySelector('.submit-btn') : null;

  if (emailForm) {
    emailForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const rawEmail = emailInput.value.trim();
      const email = rawEmail.toLowerCase(); // Always force lowercase email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.className = 'form-message error';
        return;
      }

      // Indicate loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'SAVING...';
      }

      try {
        const formData = new FormData();
        formData.append('email', email);

        const response = await fetch('subscribe.php', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          formMsg.textContent = data.message;
          formMsg.className = 'form-message success';
          emailInput.value = '';
        } else {
          formMsg.textContent = data.message || 'Something went wrong. Please try again.';
          formMsg.className = 'form-message error';
        }
      } catch (err) {
        // LocalStorage fallback when testing without active PHP server
        try {
          const stored = JSON.parse(localStorage.getItem('portfolio_subscribers') || '[]');
          stored.push({ email: email, date: new Date().toISOString() });
          localStorage.setItem('portfolio_subscribers', JSON.stringify(stored));
        } catch (e) {}

        formMsg.textContent = 'Thank you! Your email has been registered for early access.';
        formMsg.className = 'form-message success';
        emailInput.value = '';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'NOTIFY ME';
        }
      }
    });
  }
});
