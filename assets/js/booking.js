import { calculateFinalPrice } from 'price.js';

var activitySelId = null;
$('#activity-cards').on('click', '.booking-btn', function() {
    activitySelId = $(this).data('activity-id');
});
document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);

    var timeValue = document.getElementById("bk-time").value;
    var formattedTime = timeValue + ":00"; 

    var dateValue = new Date(document.getElementById("bk-date").value);
    var formattedDate = dateValue.toISOString();

    var bookingData = {
        name: document.getElementById("bk-name").value,
        participants: document.getElementById("bk-participants").value,
        email: document.getElementById("bk-email").value,
        phoneNumber: document.getElementById("bk-phone").value,
        date: formattedDate,
        time: formattedTime,
        duration: document.getElementById("bk-length").value,
        comment: document.getElementById("bk-comment").value,
        activityId: activitySelId,
        total: calculateFinalPrice()
    };

    var progressBar = $(".progress-bar");

    $.ajax({
        url: "https://adventurexpwebapp.azurewebsites.net/booking",
        method: "POST",
        data: JSON.stringify(bookingData),
        contentType: "application/json",
        success: function (response) {
            $('.page').hide();
            $('[data-page="5"]').show();
            progressBar.css("width", 100 + "%");
        },
        error: function (error) {
            alert("Error creating booking: " + error);
        }
    });
});

