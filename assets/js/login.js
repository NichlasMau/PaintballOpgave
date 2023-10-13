document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById('emailInput'); // Replace with the actual element
    const passwordInput = document.getElementById('passwordInput'); // Replace with the actual element
    const errorDiv = document.getElementById('errorDiv'); // Replace with the actual element

    const formData = new URLSearchParams();
    formData.append('email', emailInput.value);
    formData.append('password', passwordInput.value);

    fetch('https://adventurexpwebapp.azurewebsites.net/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
    })
        .then((response) => {
            if (response.status === 200) {
                return response.text(); // Assuming your server sends a plain text response
            } else if (response.status === 401) {
                throw new Error('Unauthorized');
            } else {
                throw new Error('Failed to log in');
            }
        })
        .then((data) => {
            // Handle the response here
            if (data === 'Success') {
                // Successful login
                window.location.href = '/dash.html';
            } else {
                errorDiv.innerText = 'Ugyldigt login. Prøv igen.';
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

})
