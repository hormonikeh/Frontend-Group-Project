const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');
const loginForm = document.getElementById('loginForm');
const API_BASE_URL = 'https://travelpal-backend-de3k.onrender.com/api';

let passwordVisible = false;

if (togglePasswordButton) {
  togglePasswordButton.addEventListener('click', () => {
    passwordVisible = !passwordVisible;
    passwordInput.type = passwordVisible ? 'text' : 'password';
    togglePasswordButton.querySelector('img').classList.toggle('opacity-70', passwordVisible);
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();
    
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    // Disable button to prevent double-clicks
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Logging in...';
    submitBtn.disabled = true;

    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        // SUCCESS: Save the JWT token and user details to the browser!
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect to the home/dashboard page
        window.location.href = '/home.html'; 
      } else {
        // FAIL: Show the error from your backend (e.g., "Invalid password")
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert(' Login failed and Could not connect to the server. Please check your internet.');
    } finally {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}