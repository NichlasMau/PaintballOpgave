function createActivityCard(activity) {
  const card = document.createElement("div");
  card.className = "col-xl-3 col-md-6 d-flex align-items-stretch";
  card.innerHTML = `
    <div class="icon-box">
      <img src="${activity.image}" alt="${activity.name}" width="100%">
      <div class="icon-text-box">
          <h4><a href="#">${activity.name}</a></h4>
          <p>${activity.description}</p>
      </div>
      <a class="booking-btn" data-toggle="modal" data-target="#bookingModal" data-activity-name="${activity.name}">Book</a>
    </div>
  `;
  

  return card;
}

const activityContainer = document.getElementById("activity-cards");

fetch("https://adventurexpwebapp.azurewebsites.net/activities")
  .then(response => response.json())
  .then(data => {
    data.forEach(activity => {
      const activityCard = createActivityCard(activity);
      activityContainer.appendChild(activityCard);
    });
  })
  .catch(error => console.error("Error fetching data:", error));