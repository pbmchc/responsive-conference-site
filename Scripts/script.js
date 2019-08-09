$(document).ready(function () {

   $('.beat').viewportChecker({
        classToAdd: 'pulsar',
        offset: 100
    });

    // map setup
    var latlng = new google.maps.LatLng(54.445340, 18.553448);
    function initialize() {
        var mapProp = {
            center: latlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: [
                      {
                          "elementType": "geometry",
                          "stylers": [{"color": "#f5f5f5"}]
                      },
                      {
                          "elementType": "labels.icon",
                          "stylers": [{"visibility": "off"}]
                      },
                      {
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#616161"}]
                      },
                      {
                          "elementType": "labels.text.stroke",
                          "stylers": [{"color": "#f5f5f5"}]
                      },
                      {
                          "featureType": "administrative.land_parcel",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#bdbdbd"}]
                      },
                      {
                          "featureType": "poi",
                          "elementType": "geometry",
                          "stylers": [{"color": "#eeeeee"}]
                      },
                      {
                          "featureType": "poi",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#757575"}]
                      },
                      {
                          "featureType": "poi.park",
                          "elementType": "geometry",
                          "stylers": [{"color": "#e5e5e5"}]
                      },
                      {
                          "featureType": "poi.park",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#9e9e9e"}]
                      },
                      {
                          "featureType": "road",
                          "elementType": "geometry",
                          "stylers": [{"color": "#ffffff"}]
                      },
                      {
                          "featureType": "road.arterial",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#757575"}]
                      },
                      {
                          "featureType": "road.highway",
                          "elementType": "geometry",
                          "stylers": [{"color": "#dadada"}]
                      },
                      {
                          "featureType": "road.highway",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#616161"}]
                      },
                      {
                          "featureType": "road.local",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#9e9e9e"}]
                      },
                      {
                          "featureType": "transit.line",
                          "elementType": "geometry",
                          "stylers": [{"color": "#e5e5e5"}]
                      },
                      {
                          "featureType": "transit.station",
                          "elementType": "geometry",
                          "stylers": [{"color": "#eeeeee"}]
                      },
                      {
                          "featureType": "water",
                          "elementType": "geometry",
                          "stylers": [{"color": "#c9c9c9"}]
                      },
                      {
                          "featureType": "water",
                          "elementType": "labels.text.fill",
                          "stylers": [{"color": "#9e9e9e"}]
                      }
            ]
        };

        var marker = new google.maps.Marker({
            position: latlng,
            icon: 'Images/marker.png'
        });

        var map = new google.maps.Map(document.getElementById("mapa"), mapProp);
        marker.setMap(map);
    }
    google.maps.event.addDomListener(window, 'load', initialize);

    toggleTimerVisibility();
    toggleWorkshopsLayout();
    toggleBrandImageSource();

    // hide navbar on landscape
    if (innerWidth < 768 && innerHeight < innerWidth) {
        $(document).scroll(function () {
            var position = $(window).scrollTop();
            if (position >= 570) {
                $('.navbar-custom').hide('slow');
            }
            if (position < 570) {
                $('.navbar-custom').show('slow');
            }
        });
    }

    // navigation menu click actions
    $('.menu-but').on('click', function (event) {
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 1000);
        $('.navbar-toggle').removeClass('focused');
    });

    // scroll to top action
    $('.scroll-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 1200);
        if ($('#navbar').hasClass("in")) {
            $('#navbar').removeClass("in");
            $('.navbar-toggle').removeClass('focused');
        }
    });

    // mobile navigation toggle
    $('.navbar-toggle').on('click', function (event) {
        if ($(this).hasClass('focused')) {
            $(this).removeClass('focused');
        }
        else {
            $(this).addClass('focused');
        }
    });
});

if (typeof console === "undefined") {
    console = {
        log: function () { }
    };
}

// scroll to chosen element function
function scrollToID(id, speed) {
    var offSet = 100;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#navbar-collapse');
    $('html,body').animate({ scrollTop: targetOffset }, speed);
    if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}

var JUMBO_HEIGHT = $('.jumbotron').outerHeight();

// parallax effect
function parallax() {
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (JUMBO_HEIGHT - scrolled) + 'px');
}

$(window).scroll(function (e) {
    parallax();
    var position = $(window).scrollTop();
    if (position > 1400){
        $('.upper').slideDown();
    }
    else{
        $('.upper').slideUp();
    }
    
    if ($('#navbar').hasClass("in")) {
        $('#navbar').removeClass("in");
        $('.navbar-toggle').removeClass('focused');
    }
});

// css-related actions
function checkHover() {
    $('#ddmenu').removeClass('open');
    $("#ddmenu").hover(function () {
        if (innerWidth > 760) {
            $(this).toggleClass('open');
            document.getElementById('open-menu').removeAttribute('data-toggle');
        }
        else {
            $('#open-menu').attr('data-toggle', 'dropdown');
        }
    });
}
checkHover();

function toggleTimerVisibility() {
    if (innerWidth < 768) {
        $('#timer').hide();
    }
    else {
        $('#timer').show();
    }
}

// hide loader
$(window).load(function () {
    var loader = $('.loader');
    var loadHide = function () {
        loader.fadeOut();
    }
    setTimeout(loadHide, 700);
});

function toggleWorkshopsLayout() {
    if (innerWidth > 768) {
        $('#workshops').show();
        $('#workshops-mobile').hide();
    }
    else {
        $('#workshops').hide();
        $('#workshops-mobile').show();
        if (innerWidth == 768) {
            $('.rowspan').css('height', '205px');
        }
    }
}

function toggleBrandImageSource() {
    if (innerWidth <= 320) {
        $('#brand-image').attr('src', 'img/favicons/favicon-96x96.png');
    }
    else {
        $('#brand-image').attr('src', 'img/favicons/favicon-196x196.png');
    }
}

$(window).resize(function () {
    checkHover();
    toggleTimerVisibility();
    toggleWorkshopsLayout();
    toggleBrandImageSource();
});


$('#days').countdown('2017/06/28 9:15:00', function (event) {
    $(this).html(event.strftime('%D') + '<br><small style="font-size: 0.6em">days<small>');
    $('#hours').html(event.strftime('%H ')  + '<br><small style="font-size: 0.6em">hours<small>');
    $('#minutes').html(event.strftime('%M ') + '<br><small style="font-size: 0.6em;">minutes<small>');
});

function showcontent(title, desc, speach, src, company, workshop) {
    var docHeight = $(document).height();
    var scrollTop = $(window).scrollTop();

    $('.overlay-img').attr('src', src);
    $('#credentials').html(title + " - " + company);
    $('#description').html(desc);
    if (workshop !== undefined){
        $('#workshop').html('Workshop: ' + '<strong>' + workshop + '</strong>');
    }
    else{
        $('#workshop').html('');
    }

    if (speach !== undefined) {
        $('#speach').html('Lecture: ' + '<strong>' + speach + '</strong>');
    }
    else {
        $('#speach').html('');
    }

    $('#overlay').show().css({ 'height': docHeight });
    if (innerWidth < 768 && innerHeight < innerWidth) {
        $('.overlay-content').show().css({ 'top': scrollTop - 570 + 'px' });
        $('.overlay-img').hide();
    }
    else {
        $('.overlay-content').show().css({ 'top': scrollTop - 450 + 'px' });
    }
}

function closecontent() {
    $('#overlay').hide();
    $('.overlay-content').hide();
}

$('.speaker-link').click(function (event) {
    event.preventDefault();
    var title = $(this).data('title');
    var desc = $(this).data('desc');
    var speach = $(this).data('speach');
    var src = $(this).data('src');
    var company = $(this).data('company');
    var workshop = $(this).data('work');
    showcontent(title, desc, speach, src, company, workshop);
});

$('.hdoverlay, #overlay').click(function () {
    closecontent();
});