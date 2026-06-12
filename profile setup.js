// Avatar
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
let avatarSelected = false;

avatarInput.addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    avatarPreview.src = e.target.result;
    avatarSelected = true;
    hide('avatarError');
  };
  reader.readAsDataURL(file);
});


// DOB Auto-format
document.getElementById('dob').addEventListener('input', function() {
  let val = this.value.replace(/\D/g, '');
  if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
  if (val.length > 5) val = val.slice(0, 5) + '/' + val.slice(5, 9);
  this.value = val;
});


// Bio counter and error handling
const bioField = document.getElementById('bio');
if (bioField) {
  bioField.addEventListener('input', function() {
    document.getElementById('bioCount').textContent = this.value.length;
    if (this.value.trim()) hide('bioError');
  });
}


// Interest Tags — exclude the + Add tag
const selectedInterests = new Set();

document.querySelectorAll('.interest-tag').forEach(function(tag) {
  if (tag.dataset.value === 'add') return;

  tag.addEventListener('click', function() {
    const val = this.dataset.value;

    if (selectedInterests.has(val)) {
      selectedInterests.delete(val);
      this.style.background = '';
      this.style.borderColor = '';
    } else {
      selectedInterests.add(val);
      this.style.background = '#CCF1FF';
      this.style.borderColor = '#00AEEF';
    }

    if (selectedInterests.size > 0) hide('interestError');
  });
});


// Phone — numbers, +, -, spaces only
const phoneField = document.getElementById('phone');
if (phoneField) {
  phoneField.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+\-\s]/g, '');
    if (validPhone(this.value)) hide('phoneError');
  });
}


// Clear errors as user types
document.getElementById('fullName').addEventListener('input', function() {
  if (this.value.trim()) hide('nameError');
});

document.getElementById('location').addEventListener('input', function() {
  if (validLocation(this.value)) hide('locationError');
});

document.getElementById('email').addEventListener('input', function() {
  if (validEmail(this.value)) hide('emailError');
});


// Helpers
function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }

function validDOB(val) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return false;
  const [d, m, y] = val.split('/').map(Number);
  return m >= 1 && m <= 12 && d >= 1 && d <= 31 && y >= 1900 && y <= new Date().getFullYear();
}

function validLocation(val) {
  return val.includes(',') && val.split(',')[1].trim().length > 0;
}

function validEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

function validPhone(val) {
  return /^[+]?[\d\s\-]{7,15}$/.test(val.trim());
}


// Save
document.getElementById('saveBtn').addEventListener('click', function() {
  let valid = true;

  if (!avatarSelected) { show('avatarError'); valid = false; } else hide('avatarError');

  if (!document.getElementById('fullName').value.trim()) { show('nameError'); valid = false; } else hide('nameError');

  if (!validDOB(document.getElementById('dob').value)) { show('dobError'); valid = false; } else hide('dobError');

  if (!validLocation(document.getElementById('location').value.trim())) { show('locationError'); valid = false; } else hide('locationError');

  if (!document.getElementById('bio').value.trim()) { show('bioError'); valid = false; } else hide('bioError');

  if (selectedInterests.size === 0) { show('interestError'); valid = false; } else hide('interestError');

  if (!validPhone(document.getElementById('phone').value.trim())) { show('phoneError'); valid = false; } else hide('phoneError');

  if (!validEmail(document.getElementById('email').value.trim())) { show('emailError'); valid = false; } else hide('emailError');

  if (!valid) return;

  show('successMsg');
  setTimeout(function() {
    window.location.href = 'edit-profile.html';
  }, 1500);
});