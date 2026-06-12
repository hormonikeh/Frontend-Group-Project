document.addEventListener('DOMContentLoaded', function () {
	const signInBtn = document.getElementById('signInBtn');
	const homeBtn = document.getElementById('homeBtn');
	const backBtn = document.getElementById('backBtn');

	if (signInBtn) {
		signInBtn.addEventListener('click', function () {
			window.location.href = '/signin.html';
		});
	}

	if (homeBtn) {
		homeBtn.addEventListener('click', function () {
			window.location.href = '/';
		});
	}

	if (backBtn) {
		backBtn.addEventListener('click', function () {
			history.back();
		});
	}
});

