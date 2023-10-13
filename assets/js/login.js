document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const errorDiv = document.getElementById("error-message");
        errorDiv.innerText = "";

        if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
            errorDiv.innerText = "Udfyld alle felter.";
            return;
        }

        // Check for "@" in the email
        if (!emailInput.value.includes("@")) {
            errorDiv.innerText = "Ugyldig Email.";
            return;
        }

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${emailInput.value}&password=${passwordInput.value}`,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.auth) {
                    window.location.href = "/dash";
                } else {
                    errorDiv.innerText = "Ugyldigt login. Prøv igen.";
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
