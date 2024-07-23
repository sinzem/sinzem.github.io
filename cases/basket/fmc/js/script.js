$(document).ready(function(){
    $('.carousel').slick({
        speed: 800,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/car_left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/car_right.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
    });
});