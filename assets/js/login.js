document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorDiv = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the form data
        const formData = new FormData(loginForm);

        fetch('https://adventurexpwebapp.azurewebsites.net/login', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if (response.status === 200) {
                return response.text(); // Read the response as plain text
            } 
        })
        .then((data) => {
            // Handle the response here
            if (data === 'Success') {
                window.location.href = '/dash.html  ';
            } else {
                errorDiv.innerText = 'Invalid login. Please try again.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
