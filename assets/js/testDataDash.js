    // Define the URL to fetch data from
    var employeeUrl = "https://adventurexpwebapp.azurewebsites.net/employees";
    var bookingUrl = "https://adventurexpwebapp.azurewebsites.net/bookings";
    var activityUrl = "https://adventurexpwebapp.azurewebsites.net/activities";

    // Get references to the table bodies
    var employeeTableBody = document.getElementById("employee-table-body");
    var bookingTableBody = document.getElementById("booking-table-body");
    var activityTableBody = document.getElementById("activity-table-body");


    // Function to populate employee data
    function populateEmployeeData() {
        fetch(employeeUrl)
            .then(function(response) {
                return response.json();
            })
            .then(function(employees) {
                employees.forEach(function(employee) {
                    var row = document.createElement("tr");
                    row.innerHTML = "<td>" + employee.id + "</td><td>" + employee.name + "</td><td>" + employee.email + "</td>";
                    employeeTableBody.appendChild(row);
                });
            })
            .catch(function(error) {
                console.error("Error fetching employee data:", error);
            });
    }

    // Function to format the date as "dd.mm.yyyy"
function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

// Function to populate booking data
function populateBookingData() {
    fetch(bookingUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(bookings) {
            bookings.forEach(function(booking) {
                var row = document.createElement("tr");
                row.innerHTML = "<td>" + booking.bookingid + "</td><td>" + booking.name + "</td><td>" + booking.participants + "</td><td>" + booking.email + "</td><td>" + booking.phoneNumber + "</td><td>" + formatDate(booking.date) + "</td><td>" + booking.time + "</td><td>" + booking.duration + "</td><td>" + booking.comment + "</td><td>" + booking.activityId + "</td><td>" + booking.total + "</td>";
                bookingTableBody.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error("Error fetching booking data:", error);
        });
}

function populateActivityData() {
    fetch(activityUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(activities) {
            activities.forEach(function(activity) {
                var row = document.createElement("tr");
                row.innerHTML = "<td>" + activity.id + "</td><td>" + activity.name + "</td><td>" + activity.description + "</td><td>" + activity.minAge + "</td><td>" + activity.price + "</td>";
                activityTableBody.appendChild(row);
            });
        })
        .catch(function(error) {
            console.error("Error fetching activity data:", error);
        });
}


    // Call the functions to populate data
    populateEmployeeData();
    populateBookingData();
    populateActivityData();

