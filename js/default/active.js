(function ($) {
    'use strict';
    var app = $(window);
    // :: Preloader Active Code
    app.on('load', function () {
        $('#preloader').fadeOut('1000', function () {});
    });
    // Classy Nav Active Code
    if ($.fn.classyNav) {
        $('#appNav').classyNav();
    }

    /**
     * when click background of modal
     */
    $('.bg-modal').click(function(e) {
        $('li').removeClass('active');
        $(e.target).addClass('hide');        
        console.log('clicked background of modal');
    });
    $('.btn-submenu-close').click(function(){
        $('li').removeClass('active');
        $('.bg-modal').addClass('hide');
    });
    $('.dropdown-submenu').click(function(e) {
        if($(e.target).hasClass('dropdown-submenu') || $(e.target).hasClass('submenu-pan')) {
            $('li').removeClass('active');
            $('.bg-modal').addClass('hide');
            console.log('clicked submenu');
        }        
    });

    /**
     * when click bottom of nav bar
     */
    $('.click-dropdown>ul>li').click(function(e) {         
        if ($(e.target).closest('li').hasClass('cn-dropdown-item')) {
            $('.click-dropdown>ul>li').removeClass('active');
            $(e.target).closest('li').addClass('active');
            $('.bg-modal').removeClass('hide');
            console.log('clicked nav li');
        } else {            
            $('.click-dropdown>ul>li li').removeClass('active');
            let navbar_li_text = $(">a>span", $(e.target).closest('li').parent().parent()).text();
            let m_value = 248;
            console.log($('.dropdown-submenu', $(e.target).closest('li'))[0]);
            switch(navbar_li_text) {
                case "Personal Car Leasing" : break;
                case "Business Car Leasing" : 
                    m_value = 436; break;
                case "Van Leasing" : 
                    m_value = 627; break;
                case "Special Offers" :
                    m_value = 754; break;
                default:
                    m_value = 248;                    
            }
            $('.dropdown-submenu', $(e.target).closest('li')).css('margin-left', `${m_value}px`);
            $(e.target).closest('li').addClass('active');        
            console.log('clicked nav- dropdown li');
        }        
    });
})(jQuery);