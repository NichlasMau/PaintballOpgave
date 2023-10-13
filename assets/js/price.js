function calculateTotalPrice() {
  const activityName = $('#activity-cards .booking-btn').data('activity-name');
  const participants = parseInt($('#bk-participants').val(), 10);
  const duration = parseInt($('#bk-length').val(), 10);


  const packagePrice = parseInt($('#packages').val(), 10);

  let totalPrice = 0;

  if (activityName === 'Gokart') {
    if (participants <= 10) {
      totalPrice = participants * 400 * (duration / 30);
    } else {
      totalPrice = participants * 350 * (duration / 30);
    }
  } else if (activityName === 'Minigolf' || activityName === 'Sumo Wrestling') {
    totalPrice = participants * 100 * (duration / 30);
  } else if (activityName === 'Paintball') {
    if (packagePrice === 195) {
      totalPrice = participants * 195;
    } else if (packagePrice === 360) {
      totalPrice = participants * 360;
    } else if (packagePrice === 520) {
      totalPrice = participants * 520;
    }
  }

  console.log("calculateTotal", totalPrice)
      
  return totalPrice;
}

function calculateDiscount() {
var totalPrice = 0;
const participants = parseInt($('#bk-participants').val(), 10);
totalPrice += calculateTotalPrice();
var pricePerPerson = totalPrice/participants

var time = $('#bk-time').val()
time = parseInt(time.split(":")[0], 10);

if (time >= 10 && time <= 14) {
  pricePerPerson -= (totalPrice/participants) - 50;
} else {
  pricePerPerson = 0;
}

return pricePerPerson * participants;
}


function calculateFinalPrice() {
var finalPrice = calculateTotalPriceEquip() - calculateDiscount();
return finalPrice;
}

function calculateTotalPriceEquip() {
var totalPrice = 0;
totalPrice += calculateTotalPrice();

const equipmentPrice = parseInt($('#equipment').val(), 10);
const equipmentAmount = parseInt($('#equipment_amount').val(), 10);

totalPrice += equipmentPrice * equipmentAmount;

console.log("calculateTotalPriceEquip", totalPrice)
return totalPrice;
}

export { calculateTotalPrice, calculateDiscount, calculateFinalPrice, calculateTotalPriceEquip };
