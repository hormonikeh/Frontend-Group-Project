const codeInputs = Array.from(document.querySelectorAll('.code-input'));
const errorText = document.getElementById('errorText');
const resendButton = document.getElementById('resendButton');
const continueButton = document.getElementById('continueButton');
const checkEmailButton = document.getElementById('checkEmailButton');

let countdown = 27;
let timerId = null;

function updateResendLabel() {
  if (countdown > 0) {
    resendButton.disabled = true;
    resendButton.innerHTML = `Retry in ${countdown} seconds`;
  } else {
    resendButton.disabled = false;
    resendButton.textContent = 'Resend';
  }
}

function startTimer() {
  countdown = 27;
  updateResendLabel();
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    countdown -= 1;
    if (countdown <= 0) {
      clearInterval(timerId);
      countdown = 0;
      updateResendLabel();
      return;
    }
    updateResendLabel();
  }, 1000);
}

function getCodeValue() {
  return codeInputs.map((input) => input.value.trim()).join('');
}

function showError(show) {
  errorText.style.opacity = show ? '1' : '0';
}

function resetError() {
  showError(false);
}

function focusInput(index) {
  if (index >= 0 && index < codeInputs.length) {
    codeInputs[index].focus();
  }
}

codeInputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = value;
    if (value.length > 0 && index < codeInputs.length - 1) {
      focusInput(index + 1);
    }
    resetError();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace' && input.value === '' && index > 0) {
      focusInput(index - 1);
    }
  });

  input.addEventListener('paste', (event) => {
    event.preventDefault();
    const pasteData = (event.clipboardData || window.clipboardData).getData('text').trim();
    const digits = pasteData.replace(/\D/g, '').slice(0, codeInputs.length).split('');
    digits.forEach((digit, digitIndex) => {
      codeInputs[digitIndex].value = digit;
    });
    const nextIndex = Math.min(digits.length, codeInputs.length - 1);
    focusInput(nextIndex);
    resetError();
  });
});

continueButton.addEventListener('click', () => {
  const code = getCodeValue();
  if (code.length !== codeInputs.length) {
    showError(true);
    return;
  }

  alert(`Code entered: ${code}`);
});

checkEmailButton.addEventListener('click', () => {
  window.location.href = 'mailto:alabioluwatobi830@gmail.com';
});

resendButton.addEventListener('click', () => {
  if (!resendButton.disabled) {
    startTimer();
  }
});

window.addEventListener('load', () => {
  focusInput(0);
  startTimer();
});
