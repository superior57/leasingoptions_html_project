import { GetStaticMakes, GetStaticBudgets } from "../business-logic/vehicleService.js";
import { GetModelsAPI } from "../API/VehicleAPI.js";
import { GetDealTypeUrl } from "../helpers/urlHelper";

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
        $('.cn-dropdown-item.active>ul>li').removeClass('active');
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
        if( $(e.target).hasClass('btn-submenu-close') )
            return
        if ($(e.target).closest('li').hasClass('cn-dropdown-item')) {
            
            if ( $('.click-dropdown>ul>li.active')[0] == $(e.target).closest('li')[0] ) {
                $(e.target).closest('li').toggleClass('active')
            } else {
                $('.click-dropdown>ul>li.active').removeClass('active');
                $(e.target).closest('li').addClass('active');        
            }
            $('.bg-modal').removeClass('hide');
            console.log('clicked nav li');
        } else {
            if ( $('.click-dropdown>ul>li li.active')[0] == e.target ) {
                $(e.target).closest('li').toggleClass('active')
            } else {
                $('.click-dropdown>ul>li li.active').removeClass('active');
                $(e.target).closest('li').addClass('active');        
            }       
            let navbar_li_text = $(">a>span", $(e.target).closest('li').parent().parent()).text();
            let m_value = 248;
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

            let nav_text = $(">a", $(e.target).closest('li')).text();
            switch(nav_text.trim()) {
                case "Manufacturer" : displayMakes($(e.target).closest('li')); break;
                case "Model" : displayModelMakes($(e.target).closest('li')); break;
                case "Budget" : displayBudgets($(e.target).closest('li')); break;
            }
            console.log('clicked nav- dropdown li');
        }        
    });

    $('.model-makes').on('change', (e) => {
        let manfacturerUrl = $(e.target).val();
        GetModelsAPI(1, manfacturerUrl).then((res) => {
            setModelList($(e.target).closest('.navigation-tab-body'), res.data);
        });
    })
})(jQuery);

// nav for mobile
$('li').click((e) => {
    let nav_text = $($(">div", $(e.target).closest('li'))[0]).text();
    switch(nav_text.trim()) {
        case "Manufacturer" : displayMakes($(e.target).closest('li')); break;
        case "Model" : displayModelMakes($(e.target).closest('li')); break;
    }
})
// end nav for mobile

const displayMakes = ( li_nav ) => {
    let el_makes = $('.navigation-tab-body>div', li_nav);
    el_makes.empty();
    let makes = GetStaticMakes(1);
    makes?.map((m, i) => {
        el_makes.append(`
            <div class="make-card">
                <a href="#">
                <img alt="${m.text}" width="40" height="40" class=" lazyloaded"
                    src="${getImageURL(`website/static/makes/${m.id}.svg`)}"><span
                    class="navigation_name__2Dks-">${m.id}
                    <!-- -->
                </span>
                </a>
            </div>
        `)
    });
}

const displayModelMakes = ( li_nav ) => {
    if( !state.is_displaied_model_makes ) {
        let select_makes = $('.model-makes', li_nav);
        select_makes.empty();
        let makes = GetStaticMakes(1);
        select_makes.append(`<option value="">Select Make</option>`);
        makes?.map((m, i) => {
            select_makes.append(`
                <option value="${m.id}">${m.text}</option>
            `)
        });
        state.is_displaied_model_makes = true;
    }
}

const setModelList = ( el_parent, data ) => {
    let el_models = $(".model-list", el_parent);
    el_models.empty();
    el_models.append(`<option value="">Select Model</option>`);
    data?.map((m, i) => {
        el_models.append(`
            <option value="${m.id}">${m.text}</option>
        `)
    });
}

const displayBudgets = ( li_nav ) => {
    let el_budgets = $('.budget-list', li_nav);
    el_budgets.empty();
    let budgets = GetStaticBudgets();
    budgets?.map((b, i) => {
        el_budgets.append(`
            <a href="${ GetDealTypeUrl(2, `/${b.type}/150`) }">${b.text}</a>
        `)
    })

}