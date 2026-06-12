const inputs = Array.from(document.querySelectorAll('.pin-input'));
const form = document.getElementById('verificationForm');
const countdown = document.getElementById('countdown');
const checkEmailBtn = document.getElementById('checkEmailBtn');
let seconds = 27;
const initialSeconds = 27;
let interval = null;

inputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    const target = event.target;
    const value = target.value.replace(/[^0-9]/g, '');
    target.value = value;

    if (value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });

  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const paste = event.clipboardData.getData('text').trim();
    if (!paste) return;
    const digits = paste.replace(/\D/g, '').slice(0, inputs.length).split('');
    digits.forEach((digit, i) => {
      inputs[i].value = digit;
    });
    const nextIndex = Math.min(digits.length, inputs.length - 1);
    inputs[nextIndex].focus();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const code = inputs.map((input) => input.value).join('');
  if (code.length < inputs.length) {
    alert('Please enter the 6-digit verification code.');
    return;
  }
  alert(`Verification code entered: ${code}`);
});

checkEmailBtn.addEventListener('click', () => {
  alert('Open your email app and check for the code.');
});

function updateCountdown() {
  if (seconds > 0) {
    countdown.textContent = `Retry in ${seconds} second${seconds === 1 ? '' : 's'}`;
    countdown.classList.remove('cursor-pointer', 'underline', 'text-sky-600');
    countdown.onclick = null;
    seconds -= 1;
  } else {
    countdown.textContent = 'resend';
    countdown.classList.add('cursor-pointer', 'underline', 'text-sky-600');
    countdown.onclick = () => {
      resendCode();
    };
  }
}

function startCountdown() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    updateCountdown();
    if (seconds < 0) {
      clearInterval(interval);
      interval = null;
    }
  }, 1000);
}

function resendCode() {
  alert('Verification code resent.');
  seconds = initialSeconds;
  updateCountdown();
  startCountdown();
}

updateCountdown();
startCountdown();
