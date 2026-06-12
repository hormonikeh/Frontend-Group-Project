
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const emailInput = document.getElementById('emailInput');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const backBtn = document.getElementById('backBtn');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

forgotPasswordForm.addEventListener('submit', function(e) {
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
    
    showSuccess(`Reset link sent to ${email}`);
    
    forgotPasswordForm.reset();
    
    console.log('Password reset requested for:', email);
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
