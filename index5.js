const experienceButtons = document.querySelectorAll(".experience-btn");
const image = document.getElementById("Icon");

    experienceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Reset all buttons to default state
    experienceButtons.forEach((btn) => {
      btn.querySelector('label').classList.remove("bg-blue-600", "text-white");
        btn.querySelector('label').classList.add("bg-white", "text-gray-900");

        if (image) image.classList.remove("brightness-0", "invert");
    });
    // Activate clicked button
    const label = button.querySelector('label');
    label.classList.remove('bg-white', 'text-gray-900');
    label.classList.add("bg-[#4dabe9]", "text-white");
  
  const ActiveImage = button.querySelector("Icon");
  if (ActiveImage) ActiveImage.add('brightness-0') 
    const radio = button.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
});
    });

const charterCard = document.getElementById('safetyCharterCard');
const charterCheckbox = document.getElementById('safetyCheckbox');
const checkboxMarker = document.getElementById('checkboxMarker');
const tickIcon = document.getElementById('tickIcon');
const charterTitle = document.getElementById('charterTitle');
const submitBtn = document.getElementById('submitBtn');

if (charterCard && charterCheckbox && submitBtn) {
  charterCheckbox.addEventListener('change', () => {
    if (charterCheckbox.checked) {
        //enable the submit button
        submitBtn.disabled = false;
      
      //  Make inner checkbox indicator white with black tick
      checkboxMarker.classList.replace('border-gray-300', 'border-white');
      checkboxMarker.classList.add('bg-white');
      tickIcon.classList.replace('hidden', 'block');
      tickIcon.classList.add('text-black');
    } else {
        //Reorder and lock down the submit button if user unchecks
        submitBtn.disabled = true;
      // Revert everything back to default state when unchecked
      charterCard.classList.replace('bg-[#488843]', 'bg-white');
      charterCard.classList.replace('text-white', 'text-gray-900');
      charterCard.classList.replace('border-[#488843]', 'border-gray-200');
      
      charterTitle.classList.replace('text-white', 'text-[#488843]');
      
      checkboxMarker.classList.replace('border-white', 'border-gray-300');
      checkboxMarker.classList.remove('bg-white');
      tickIcon.classList.replace('block', 'hidden');
      tickIcon.classList.remove('text-[#488843]');
    }
  });
}