const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');
const loginForm = document.getElementById('loginForm');

let passwordVisible = false;

if (togglePasswordButton) {
  togglePasswordButton.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? 'text' : 'password';
    togglePasswordButton.querySelector('img').classList.toggle('opacity-70', passwordVisible);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }
    alert(`Logging in with ${email}`);
  });
}
