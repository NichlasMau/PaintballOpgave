import { calculateTotalPrice, calculateTotalPriceEquip } from './price.js';

$(document).ready(function() {
    var totalPages = $(".page").length;
    var current_page = 1;
    var max_page = 4;
    var progressBar = $(".progress-bar");
    var activityName = null;
  
    document.getElementById('bk-date').min = new Date().toISOString().split('T')[0];
  
    function updateProgressBar() {
      var percent = ((current_page - 1) / (totalPages - 1)) * 100;
      progressBar.css("width", percent + "%");
    }
  
    function showPage() {
      $('.page').hide();
      $('[data-page="' + current_page + '"]').show();
      if (current_page === 1) {
        $('.prev').hide();
      } else {
        $('.prev').show();
      }
      if(current_page == 3) {
        const participants = parseInt($('#bk-participants').val(), 10);

        const equipment_amount = $('[data-page="3"] select#equipment_amount');
          equipment_amount.html('');
  
          for (let i = 0; i <= participants; i++) {
              equipment_amount.append('<option value="' + i + '">' + i + '</option>');
          }
      }
      if (current_page === max_page) {
        $('.next').hide();
        displayOverview();
      } else {
        $('.next').show();
      }
      if (activityName) {
        $('.modal-title').text('Booking af ' + activityName);
      }
    }
  
    function validatePage(page) {
      const currentPage = document.querySelector(`[data-page="${page}"]`);
      const requiredFields = currentPage.querySelectorAll('[required]');
      let isValid = true;
  
      requiredFields.forEach(field => {
        if (!field.value) {
          isValid = false;
          field.classList.add('is-invalid');
        } else {
          field.classList.remove('is-invalid');
        }
      });
  
      return isValid;
    }
  
    $('.next').click(function() {
      if (current_page < max_page) {
        if (validatePage(current_page)) {
          current_page++;
          updateProgressBar();
          showPage();
        }
      }
    });
  
    $('.prev').click(function() {
      if (current_page > 1) {
        current_page--;
        updateProgressBar();
        showPage();
      }
    });
  
    showPage();
  
    $('#activity-cards').on('click', '.booking-btn', function() {
      activityName = $(this).data('activity-name');
      $('.modal-title').text('Booking af ' + activityName);
  
      const select = $('[data-page="3"] select#equipment');
      select.html(''); 
  
      if (activityName === 'Gokart' || activityName === 'Paintball') {
        select.append('<option value="0">Ingen</option>');
        select.append('<option value="200">Hjelmkamera i 30 min (200 kr)</option>');
        select.append('<option value="350">Hjelmkamera i 1 time (350 kr)</option>');
        select.append('<option value="600">Hjelmkamera i 2 timer (600 kr)</option>');
      } else {
        select.append('<option value="0">Ingen</option>');
      }

      const packages = $('[data-page="2"] select#packages');
      const packagesText = $('[data-page="2"] #package-text');
      packages.html('')

      if (activityName === 'Paintball') {
        packages.append('<option value="195">Basispakke: 2 timer inkl. 100 kugler (195 kr)</option>');
        packages.append('<option value="360">Guldpakke: 2 timer inkl. 500 kugler (360 kr)</option>');
        packages.append('<option value="520">Platinpakke 2 timer med frit kugleforbrug (520 kr)</option>');
      } else {
        packages.hide();
        packagesText.hide();
      }
    });
  
    function displayOverview() {
        const overviewElement = document.getElementById("booking-overview");
        const bkDate = document.getElementById("bk-date").value;
        const bkLength = $("#bk-length option:selected").text();
        const bkTime = $("#bk-time option:selected").text();
        const bkName = document.getElementById("bk-name").value;
        const bkParticipants = document.getElementById("bk-participants").value;
        const bkEmail = document.getElementById("bk-email").value;
        const bkPhone = document.getElementById("bk-phone").value;
        const bkComment = document.getElementById("bk-comment").value;
        const equipment = $("#equipment option:selected").text();
        const equipmentAmount = $("#equipment_amount option:selected").text();
        const totalPrice = calculateTotalPrice();
        const totalPriceEquip = calculateTotalPriceEquip();

      
        const overviewHTML = `
          <table class="table">
            <tr>
              <td><strong>Dato & tid:</strong></td>
              <td>${bkDate} ${bkTime}</td>
            </tr>
            <tr>
              <td><strong>Varighed:</strong></td>
              <td>${bkLength}</td>
            </tr>
            <tr>
              <td><strong>Navn:</strong></td>
              <td>${bkName}</td>
            </tr>
            <tr>
              <td><strong>Antal deltagere:</strong></td>
              <td>${bkParticipants}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${bkEmail}</td>
            </tr>
            <tr>
              <td><strong>Telefon:</strong></td>
              <td>${bkPhone}</td>
            </tr>
            <tr>
              <td><strong>Kommentar:</strong></td>
              <td>${bkComment ? bkComment : 'Ingen'}</td>
            </tr>
          </table>
          <h5 style="text-align: center">Prisoversigt</h5>
          <table class="table">
            <tr>
                <td><strong>${bkParticipants}x person(er) (${totalPrice/bkParticipants} kr)</strong></td>
                <td>${totalPrice} DKK</td>
            </tr>
            ${equipmentAmount > 0 ? `
            <tr>
                <td><strong>${equipment ? (equipmentAmount + 'x ' + equipment) : 'Ingen'}</strong></td>
                <td>${equipmentAmount * (totalPriceEquip - totalPrice)/equipmentAmount} DKK</td>
            </tr>` : ''}
            <tr>
                <td><strong>Total Pris:</strong></td>
                <td><strong>${totalPriceEquip} DKK</strong></td>
            </tr>
          </table>
        `;
      
        overviewElement.innerHTML = overviewHTML;
      }
      
  


  });
