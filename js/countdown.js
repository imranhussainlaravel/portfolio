/* ====================================================
   Countdown & Form Handler JavaScript
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Set Target Countdown Date (Default: 30 days from today)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30);

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

  // Initial call & Interval loop
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Subscription Form Logic
  const emailForm = document.getElementById('subscribe-form');
  const emailInput = document.getElementById('email-input');
  const formMsg = document.getElementById('form-message');

  if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        formMsg.textContent = 'Please enter a valid email address.';
        formMsg.className = 'form-message error';
        return;
      }

      formMsg.textContent = 'Thank you! You have been added to our early access list.';
      formMsg.className = 'form-message success';
      emailInput.value = '';

      setTimeout(() => {
        formMsg.className = 'form-message';
      }, 5000);
    });
  }
});
