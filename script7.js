document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('getStarted');

  if (!button) {
    return;
  }

  button.addEventListener('click', function () {
    button.disabled = true;
    button.textContent = 'Starting...';

    setTimeout(function () {
      button.disabled = false;
      button.textContent = 'Get Started';
      window.alert('Welcome to Travelpal!');
    }, 700);
  });
});
