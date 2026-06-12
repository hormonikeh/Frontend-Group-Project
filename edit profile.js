// Avatar — handles both mobile (inside card) and desktop (above card) wrappers
const avatarInput = document.getElementById('avatarInput');

document.querySelectorAll('.avatar-wrapper').forEach(function(wrapper) {
  wrapper.addEventListener('click', function() {
    avatarInput.click();
  });
});

avatarInput.addEventListener('change', function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const previews = document.querySelectorAll('.avatar-wrapper img');
    previews.forEach(function(img) {
      img.src = e.target.result;
    });
  };
  reader.readAsDataURL(file);
});


// DOB Auto-format — DD/MM/YYYY
const dobField = document.getElementById('dob');

if (dobField) {
  dobField.placeholder = 'DD/MM/YYYY';

  dobField.addEventListener('focus', function() {
    // Only clear if value doesn't already match DD/MM/YYYY
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(this.value)) {
      this.value = '';
    }
  });

  dobField.addEventListener('input', function() {
    let val = this.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    if (val.length > 5) val = val.slice(0, 5) + '/' + val.slice(5, 9);
    this.value = val;
  });
}


// Bio Counter
const bioField = document.getElementById('bio');
const bioCounter = document.querySelector('.bio-counter');

function updateBioCount() {
  bioCounter.textContent = bioField.value.length + '/200 characters';
}

updateBioCount();
bioField.addEventListener('input', updateBioCount);


// Interest Tags — × removes tag
document.querySelectorAll('.interest-tag').forEach(function(tag) {
  const closeBtn = tag.querySelector('.remove-tag');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    tag.remove();
  });
});


// + Add custom tag
document.getElementById('addTagBtn').addEventListener('click', function() {
  const inputBox = document.getElementById('addTagInput');
  inputBox.classList.toggle('hidden');
  if (!inputBox.classList.contains('hidden')) {
    document.getElementById('customTagText').focus();
  }
});

function addCustomTag() {
  const input = document.getElementById('customTagText');
  const val = input.value.trim();
  if (!val) return;

  const tag = document.createElement('span');
  tag.className = 'interest-tag inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-[1.5px] border-[#858585] text-[14px] font-medium text-[#1A365D] bg-[#CCF1FF]';
  tag.innerHTML = val + ' <span class="remove-tag font-bold cursor-pointer">×</span>';

  tag.querySelector('.remove-tag').addEventListener('click', function(e) {
    e.stopPropagation();
    tag.remove();
  });

  const addBtn = document.getElementById('addTagBtn');
  addBtn.parentNode.insertBefore(tag, addBtn);

  input.value = '';
  document.getElementById('addTagInput').classList.add('hidden');
}

document.getElementById('customTagText').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') addCustomTag();
});


// Phone — numbers only
document.getElementById('phone').addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9+\-\s]/g, '');
});


// Email validation helper
function validEmail(val) {
  return /^[^\s@]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.trim());
}

// Clear email error as user types
document.getElementById('email').addEventListener('input', function() {
  if (validEmail(this.value)) hide('emailError');
});

function show(id) { document.getElementById(id).classList.remove('hidden'); }
function hide(id) { document.getElementById(id).classList.add('hidden'); }


// Save Changes — handles both mobile and desktop buttons
function handleSave() {
  const email = document.getElementById('email').value.trim();

  if (!validEmail(email)) {
    show('emailError');
    return;
  }

  hide('emailError');
  show('successMsg');

  setTimeout(function() {
    window.location.href = 'public-profile.html';
  }, 1500);
}

const saveButtons = document.querySelectorAll('#saveBtn, #desktopSaveBtn');
saveButtons.forEach(function(button) {
  button.addEventListener('click', handleSave);
});