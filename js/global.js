window.dropdown_history = [];

$('#btn_header_toggle').click(function() {
    // $('.navigation_is-active__1RKE2').removeClass('navigation_is-active__1RKE2');
    $('#nav_bar_mobile').toggleClass('d-block');

});

$('.navigation_multilevel-controls__back__39pay').click(function() {
    if(window.dropdown_history.length > 0) {
        console.log(window.dropdown_history.length);
        window.dropdown_history[window.dropdown_history.length - 1].removeClass('navigation_is-active__1RKE2');
        window.dropdown_history.splice(-1, 1);
    }
});
$('.navigation_multilevel-controls__close__3meoG').click(function(){
    $('.navigation_is-active__1RKE2').removeClass('navigation_is-active__1RKE2');
    $('#nav_bar_mobile').removeClass('d-block');
});

$('.navigation_lvl-item__3Ts7B').click(function(e) {
    window.dropdown_history.push($(e.target).closest('li'));
    $(e.target).closest('li').addClass('navigation_is-active__1RKE2');
});
$('.navigation_lvl__2RqqG').click(function(e) {
    window.dropdown_history.push($(e.target).closest('li'));
    $(e.target).closest('li').addClass('navigation_is-active__1RKE2');
});