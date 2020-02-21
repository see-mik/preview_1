function toggleSearchForm(e) {
    // form use onclick handler in HTML

    let formEl = document.getElementById("jsSearchForm");
    formEl.toggleAttribute("data-active");
}

jQuery(document).ready(($) => {

    function contentTabs() {
        /* Function add tab functionality to HTML
        * add class "jsTab" to element which you want to see as a tab block
        * add attribute "data-tab-btn" to each button which change tab content
        * add attribute "data-tab-content" to each tab body element which you want to change when trigger a spesific tab
        * to match button and tab body, values of attributes "data-tab-btn" and "data-tab-content" must be the same
        */

        const btnActive = "_tab-btn-active",
              contentActive = "_tab-content-active";

        let tabs = $(".jsTab");
        let btns = tabs.find("button[data-tab-btn]");
        let contents = tabs.find("*[data-tab-content]");

        btns.click(function () {
            if( $(this).hasClass(btnActive) ) {
                return;
            }

            let dataCurrent = $(this).attr("data-tab-btn");

            btns.removeClass(btnActive);
            $(this).addClass(btnActive);

            contents.each((i, item) => {
                let it = $(item);
                it.removeClass(contentActive);
                it.addClass( it.attr('data-tab-content') === dataCurrent ? contentActive : "");
            });
        });

        // init basic active classes
        $(btns[0]).addClass(btnActive);
        $(contents[0]).addClass(contentActive);
    }
    // init tab fuctionality
    contentTabs();


    // init First sreen slider
    $('.jsFullScreenSlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });

    // init Preview Full screen slider
    $('.jsPreviewSlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true
    });


    // Portfolio filtering
    const PORTFOLIO = new Filterizr(".jsPortfolio", {
        filter: 'all',
        gridItemsSelector: '.jsPortfolioItem',
        easing: 'ease-out',
        delay: 100
    });

    $(".jsFilterBtn").click(function () {
        $(".jsFilterBtn").each((i, el) => {
            $(el).removeClass("_filter-active");
        });

        $(this).addClass("_filter-active");
    });


    /* Do animation on scroll and check if the animation carrently in to viewport of browser */
    /// function body
    var $el = $('.jsAniateOnScorll');
    var scorlledScope = {};
    var handler = onVisibilityChange($el, function() {

        if (!scorlledScope.success) {

            /// Count Animation
            $('.jsCount').each(function () {

                $(this).prop('Counter',0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });

            scorlledScope.success = true;
        }
    });


    /// jQuery add eventListener onScroll
    $(window).on('DOMContentLoaded load resize scroll', handler);

    /// check Element condition comparatvly previous condition
    function onVisibilityChange(el, callback) {
        return function () {
            if (isElementInViewport(el)) {
                if (typeof callback == 'function') {
                    callback();
                }
            }
        }
    }

    /// check is target element in viewport of browser
    function isElementInViewport (el) {
        var viewPort = document.documentElement;

        if (typeof jQuery === "function" && el instanceof jQuery) {
            // if element is using jQuery
            el = el[0];
        }

        return el.offsetTop - viewPort.clientHeight <= viewPort.scrollTop;
    }



    /// Animate goTop button
    // var body = $("html, body");
    // body.stop().animate({scrollTop:0}, 500, 'swing', function() {
    //     alert("Finished animating");
    // });
});