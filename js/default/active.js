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

    // :: Gallery Menu Style Code
    $('.portfolio-menu button.btn').on('click', function () {
        $('.portfolio-menu button.btn').removeClass('active');
        $(this).addClass('active');
    })

    // :: Magnific Popup Active Code
    if ($.fn.magnificPopup) {
        $('.video-play-btn').magnificPopup({
            type: 'iframe'
        });
    }

    if ($.fn.magnificPopup) {
        $('.image-popup').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            },
            removalDelay: 500,
            mainClass: 'mfp-fade',
            preloader: true,
            callbacks: {
                beforeOpen: function () {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            closeOnContentClick: true,
            midClick: true
        });
    }

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: WOW Active Code
    if (app.width() > 480) {
        new WOW().init();
    }

    // :: Jarallax Active Code
    if ($.fn.jarallax) {
        $('.jarallax').jarallax({
            speed: 0.5
        });
    }

    // :: Scrollup Active Code
    if ($.fn.scrollUp) {
        app.scrollUp({
            scrollSpeed: 1100,
            scrollText: '<i class="lni-chevron-up"></i>'
        });
    }

    // :: Counter Up Active Code
    if ($.fn.counterUp) {
        $('.rs-counter').counterUp({
            delay: 15,
            time: 1500
        });
    }

    // :: Prevent Default 'a' Click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // :: Service Active Code
    $('.service-card').on('mouseenter', function () {
        $('.service-card').removeClass('active');
        $(this).addClass('active');
    })

    // :: Animated Headline Active Code
    if ($.fn.animatedHeadline) {
        $('.animated--headline').animatedHeadline({
            animationType: 'clip'
        });
    }

    // :: Password Strength Active Code
    if ($.fn.passwordStrength) {
        $('#registerPassword').passwordStrength({
            minimumChars: 8
        });
    }

    // :: Password Hide Show Active Code
    var inputPassword = $('.input-psswd');
    $('.label-psswd').on('click', function () {
        if (inputPassword.attr('psswd-shown') == 'false') {
            inputPassword.removeAttr('type');
            inputPassword.attr('type', 'text');
            inputPassword.removeAttr('psswd-shown');
            inputPassword.attr('psswd-shown', 'true');
        } else {
            inputPassword.removeAttr('type');
            inputPassword.attr('type', 'password');
            inputPassword.removeAttr('psswd-shown');
            inputPassword.attr('psswd-shown', 'false');
        }
        $(this).toggleClass("active");
    });
    
    // :: Countdown Active Code
    if ($.fn.countdown) {
        $('#csClock').countdown('2022/05/31', function (event) {
            $(this).html(event.strftime('<div>%D <span>Day</span></div> <div>%H <span>Hour</span></div> <div>%M <span>Min</span></div> <div>%S <span>Sec</span></div>'));
        });
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