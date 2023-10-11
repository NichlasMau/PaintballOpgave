$(document).ready(function(){
    var totalPages = $(".page").length;
    var current_page = 1;
    var max_page = 4;
    var progressBar = $(".progress-bar");

    var currentDate = new Date();
    var minDateStr = currentDate.toISOString().split('T')[0];
    //document.getElementById('datepicker').setAttribute('min', minDateStr);


    $("body").delegate("#datepicker", "focusing", function(){
        $(this).datepicker();
    });

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
        if (current_page === max_page) {
            $('.next').hide();
        } else {
            $('.next').show();
        }
    }

    $('.next').click(function(){
        if (current_page < max_page) {
            current_page++;
            updateProgressBar();

            showPage();
            
        }
    });

    $('.prev').click(function(){
        if (current_page > 1) {
            current_page--;
            updateProgressBar();

            showPage();
        }
    });

    showPage();
});