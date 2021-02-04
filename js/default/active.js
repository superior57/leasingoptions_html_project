(function ($) {
    'use strict';
    var app = $(window);
    // :: Preloader Active Code
    app.on('load', function () {
        $('#preloader').fadeOut('1000', function () {});
    });
    // :: Classy Nav Active Code
    if ($.fn.classyNav) {
        $('#appNav').classyNav();
    }

    $(document).on('click', '.breakpoint-off .classynav.click-dropdown  ul li', function(e) {
        let el_li = $(e.target).closest('li');
        $('.breakpoint-off .classynav.click-dropdown  ul li').removeClass('active');
        el_li.addClass('active');
        $('.bg-modal').removeClass('hide');
    });
    $(document).on('click', '.bg-modal', function(e) {
        let el = $(e.target);
        el.addClass('hide');
        $('.breakpoint-off .classynav.click-dropdown  ul li').removeClass('active');
    });

})(jQuery);