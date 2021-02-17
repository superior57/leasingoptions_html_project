import { GetStaticMakes, GetStaticBudgets } from "../business-logic/vehicleService.js";
import { GetModelsAPI } from "../API/VehicleAPI.js";
import { GetDealTypeUrl } from "../helpers/urlHelper.js";

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
            state.leasing_deal_type = $(e.target).closest('li').attr('data-leasing-type');
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
                case "Body" : displayBodies($(e.target).closest('li')); break;
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
            <a href="${ GetDealTypeUrl(state.leasing_deal_type, `/${b.type}/150`) }">${b.text}</a>
        `)
    })
}

const displayBodies = ( li_nav ) => {
    let el_bodies = $('.navigation-tab-body', li_nav);
    el_bodies.empty();

    if( state.leasing_deal_type == 3 ) {
        el_bodies.append(`
        <a class="text-decoration-none" href="/van-leasing/body-type/small">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Small" width="200" height="80" class=" lazyloaded"  src="${getImageURL(`website/static/vehicle-images/panel-small-van.png`)}">
                <span class="navigation_name__2Dks-">Small</span>
                <span class="navigation_description__3GFwS">e.g. Ford Connect, Peugeot Partner</span>
            </span>
        </a>
        <a class="text-decoration-none" href="/van-leasing/body-type/medium">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Medium" width="200" height="80" class=" lazyloaded" src="${getImageURL(`website/static/vehicle-images/panel-medium-van.png`)}">
                <span class="navigation_name__2Dks-">Medium</span> 
                <span class="navigation_description__3GFwS">e.g. Citroen Dispatch, VW Transporter</span>
            </span>
        </a>        
        <a class="text-decoration-none" href="/van-leasing/body-type/large">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Large" width="200" height="80" class=" lazyloaded" src="${getImageURL(`website/static/vehicle-images/panel-large-van.png`)}">
                <span class="navigation_name__2Dks-">Large</span> 
                <span class="navigation_description__3GFwS">e.g. Peugeot Boxer, Citroen Relay</span>
            </span>
        </a>            
        <a class="text-decoration-none" href="/van-leasing/body-type/pickup">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Pickup" width="200" height="80" class=" lazyloaded" src="${getImageURL(`website/static/vehicle-images/panel-pickup.png`)}">
                <span class="navigation_name__2Dks-">Pickup</span> 
                <span class="navigation_description__3GFwS">e.g. Mitsubish L200, Ford Ranger</span>
            </span>
        </a>
        <a class="text-decoration-none" href="/van-leasing/body-type/crew">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Crew" width="200" height="80" class=" lazyloaded" src="${getImageURL(`website/static/vehicle-images/panel-crew-van.png`)}">
                <span class="navigation_name__2Dks-">Crew</span> 
                <span class="navigation_description__3GFwS">e.g. VW Transporter, Ford Transit Custom</span>
            </span>
        </a>
        <a class="text-decoration-none" href="/van-leasing/body-type/dropside">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Dropside" width="200" height="80" class=" lazyloaded" src="${getImageURL(`website/static/vehicle-images/panel-dropside.png`)}">
                <span class="navigation_name__2Dks-">Dropside</span> 
                <span class="navigation_description__3GFwS">e.g. Ford Transit, VW Crafter</span>
            </span>
        </a>            
        <a class="text-decoration-none" href="/van-leasing/body-type/luton">
            <span class="navigation_body-type-card__2un9b">
                <img alt="Luton" width="200" height="80" class=" lazyloaded" src="${getImageURL(`website/static/vehicle-images/panel-luton-van.png`)}">
                <span class="navigation_name__2Dks-">Luton</span> 
                <span class="navigation_description__3GFwS">e.g. Mercedes-Benz Sprinter, Ford Transit</span>
            </span>
        </a>
        `)
    } else {
        el_bodies.append(`
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="suv / crossover"
                    src="${getImageURL(`website/static/vehicle-images/panel-suv.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">SUV / Crossover</span>
                <span class="navigation_description__3GFwS">e.g.Jeep Cherokee SW, Land Rover Discovery
                    SW</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="hatchback"
                    src="${getImageURL(`website/static/vehicle-images/panel-hatchback.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">Hatchback</span>
                <span class="navigation_description__3GFwS">e.g.Toyota Aygo, Vauxhall Astra</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="saloon"
                    src="${getImageURL(`website/static/vehicle-images/panel-saloon.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">Saloon</span>
                <span class="navigation_description__3GFwS">e.g.Alfa Romeo Giulia, Ford Mondeo</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="estate"
                    src="${getImageURL(`website/static/vehicle-images/panel-estate.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">Estate</span>
                <span class="navigation_description__3GFwS">e.g.Hyundai i30 Tourer, Kia Ceed
                    Sportswagon</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="coupe"
                    src="${getImageURL(`website/static/vehicle-images/panel-coupe.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">Coupe</span>
                <span class="navigation_description__3GFwS">e.g.Audi A5, BMW 2 Series</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="convertible / cabriolet"
                    src="${getImageURL(`website/static/vehicle-images/panel-convertible.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">Convertible / Cabriolet</span>
                <span class="navigation_description__3GFwS">e.g.Mercedes C Class, Smart ForTwo</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="mpv"
                    src="${getImageURL(`website/static/vehicle-images/panel-mpv.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">MPV</span>
                <span class="navigation_description__3GFwS">e.g.Renault Grand Scenic, Volkswagon Touran</span>
                </span>
            </a>
            <a class="text-decoration-none" href="">
                <span class="navigation_body-type-card__2un9b">
                <img alt="sports car"
                    src="${getImageURL(`website/static/vehicle-images/panel-sportscar.png`)}"
                    width="200" height="80" class="lazyload">
                <span class="navigation_name__2Dks-">Sports Car</span>
                <span class="navigation_description__3GFwS">e.g.Abarth 124 Spider Roadster, Audi R8
                    Coupe</span>
                </span>
            </a>
        `)
    }
}