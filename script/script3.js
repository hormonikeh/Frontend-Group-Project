const API_BASE_URL = 'https://travelpal-backend-de3k.onrender.com/api';


const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('emailInput');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const backBtn = document.getElementById('backBtn');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

forgotPasswordForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showError('Please enter an email address');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showError('Please enter a valid email address');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/user/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess(data.message || `Reset link sent to ${email}`);
            forgotPasswordForm.reset();
        } else {
            showError(data.message || 'Failed to send reset link.');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Network error. Could not reach the server.');
    }
});


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function showSuccess(message) {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
}

backBtn.addEventListener('click', function() {
    window.history.back();
});

emailInput.addEventListener('input', function() {
    if (errorMessage && !errorMessage.classList.contains('hidden')) {
        errorMessage.classList.add('hidden');
    }
});
