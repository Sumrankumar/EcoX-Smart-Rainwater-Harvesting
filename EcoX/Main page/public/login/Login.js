const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Helpers to manage accounts in localStorage
function getAccounts() {
	try {
		const stored = localStorage.getItem('accounts');
		return stored ? JSON.parse(stored) : [];
	} catch (e) {
		return [];
	}
}

function saveAccounts(accounts) {
	localStorage.setItem('accounts', JSON.stringify(accounts));
}

function setSessionUser(user) {
	localStorage.setItem('user', JSON.stringify(user));
}

// Ensure accounts array exists
if (!localStorage.getItem('accounts')) {
	saveAccounts([]);
}

// If already logged in, go to dashboard
document.addEventListener('DOMContentLoaded', () => {
	const existing = localStorage.getItem('user');
	if (existing) {
		window.location.href = '/';
	}
});

// Handle signup form submission
signupForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(signupForm);
	const name = formData.get('name') || signupForm.querySelector('input[type="text"]').value;
	const email = formData.get('email') || signupForm.querySelector('input[type="email"]').value;
	const password = formData.get('password') || signupForm.querySelector('input[type="password"]').value;
	
	// Simple validation
	if (name && email && password) {
		const accounts = getAccounts();
		const alreadyExists = accounts.some(acc => acc.email.toLowerCase() === String(email).toLowerCase());
		if (alreadyExists) {
			alert('Account already exists. Please sign in.');
			container.classList.remove('right-panel-active');
			return;
		}

		const newAccount = { name: String(name), email: String(email), password: String(password) };
		saveAccounts([...accounts, newAccount]);
		setSessionUser({ name: newAccount.name, email: newAccount.email });
		alert('Account created successfully! Redirecting to dashboard...');
		// Navigate to main dashboard
		window.location.href = '/';
	} else {
		alert('Please fill in all fields');
	}
});

// Handle signin form submission
signinForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const formData = new FormData(signinForm);
	const email = formData.get('email') || signinForm.querySelector('input[type="email"]').value;
	const password = formData.get('password') || signinForm.querySelector('input[type="password"]').value;
	
	// Validate against stored accounts
	if (email && password) {
		const accounts = getAccounts();
		const account = accounts.find(acc => acc.email.toLowerCase() === String(email).toLowerCase());
		if (!account) {
			alert('No account found for this email. Please sign up.');
			container.classList.add('right-panel-active');
			return;
		}
		if (account.password !== String(password)) {
			alert('Incorrect password. Please try again.');
			return;
		}

		setSessionUser({ name: account.name, email: account.email });
		alert('Login successful! Redirecting to dashboard...');
		// Navigate to main dashboard
		window.location.href = '/';
	} else {
		alert('Please fill in all fields');
	}
});