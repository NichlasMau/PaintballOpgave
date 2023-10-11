document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    var formData = new FormData(event.target);

    // Create an object to store the data (you can also use JSON.stringify(formData) if you prefer)
    var timeValue = document.getElementById("bk-time").value;
    var formattedTime = timeValue + ":00"; // Add seconds if needed

    var bookingData = {
        name: document.getElementById("bk-name").value,
        participants: document.getElementById("bk-participants").value,
        email: document.getElementById("bk-email").value,
        phoneNumber: document.getElementById("bk-phone").value,
        date: document.getElementById("bk-date").value,
        time: formattedTime,
        comment: document.getElementById("bk-comment").value,
        activityId: 1,
        total: 100
    };

    console.log(bookingData)

    $.ajax({
        url: "https://adventurexpwebapp.azurewebsites.net/booking", // Replace with your server endpoint
        method: "POST",
        data: JSON.stringify(bookingData),
        contentType: "application/json",
        success: function (response) {
            alert("Booking created successfully!");
        },
        error: function (error) {
            alert("Error creating booking: " + error);
        }
    });
});