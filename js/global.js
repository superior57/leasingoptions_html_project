$('#btn_header_toggle').click(function() {

    $('#nav_bar_mobile').toggleClass('d-block');
});

$('.navigation_multilevel-controls__close__3meoG').click(function(){
    $('.navigation_is-active__1RKE2').removeClass('navigation_is-active__1RKE2');
    $('#nav_bar_mobile').removeClass('d-block');
});

$('.navigation_lvl-item__3Ts7B').click(function(e) {
    $(e.target).closest('li').addClass('navigation_is-active__1RKE2');
});
$('.navigation_lvl__2RqqG').click(function(e) {
    $(e.target).closest('li').addClass('navigation_is-active__1RKE2');
});