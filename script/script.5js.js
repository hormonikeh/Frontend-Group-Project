const API_BASE_URL = 'https://travelpal-backend-de3k.onrender.com/api';

function togglePassword(fieldId) {
    const input = document.getElementById(fieldId);
    const button = event.target.closest('button');
    const icon = button.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

document.getElementById('signupForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value.trim(); // Make sure this ID exists in their HTML!

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // UPDATED: Your backend userController requires 8 characters!
    if (password.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, { // Adjust to /signup if your routes use that
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: email, 
                password: password
                // Note: If your backend requires firstName, lastName, etc. during registration, 
                // grab them using document.getElementById() and add them here!
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Account created successfully! Please check your email to verify.');
            window.location.href = '/signin.html';
        } else {
            alert(`Signup Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Network Error:', error);
        alert('Could not connect to the server.');
    }
});
