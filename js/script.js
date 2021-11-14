(function($) {
    "use strict";

    // Windows load

    $(window).on("load", function() {

        // Site loader 

        $(".loader-inner").fadeOut();
        $(".loader").delay(200).fadeOut("slow");

    });



    // Site navigation setup

    var header = $('.header'),
        pos = header.offset(),
        blockTop = $('.block-top');

    $(window).scroll(function() {
        if ($(this).scrollTop() > pos.top + 100 && header.hasClass('stopping')) {
            header.addClass('scrolling').removeClass('stopping');
            blockTop.addClass('active');

        } else if ($(this).scrollTop() <= pos.top + 100 && header.hasClass('scrolling')) {
            header.removeClass('scrolling').addClass('stopping');
            blockTop.removeClass('active');

        }
    });


    // Scroll to

    $('a.scroll').smoothScroll({
        speed: 800,
        offset: -55
    });


    // Slider

    $('.main-slider').flexslider({
        animation: "fade",
        slideshow: true,
        directionNav: false,
        controlNav: true,
        pauseOnAction: false,
        animationSpeed: 1000
    });



    // Mobile menu

    var mobileBtn = $('.mobile-but');
    var nav = $('.main-nav ul');
    var navHeight = nav.height();

    $(mobileBtn).on("click", function() {
        $(".toggle-mobile-but").toggleClass("active");
        nav.slideToggle();
        $('.main-nav li a').addClass('mobile');
        return false;


    });

    $(window).resize(function() {
        var w = $(window).width();
        if (w > 320 && nav.is(':hidden')) {
            nav.removeAttr('style');
            $('.main-nav li a').removeClass('mobile');
        }

    });

    $('.main-nav li a').on("click", function() {
        if ($(this).hasClass('mobile')) {
            nav.slideToggle();
            $(".toggle-mobile-but").toggleClass("active");
        }

    });



    // Append images as css background

    $('.background-img').each(function() {
        var path = $(this).children('img').attr('src');
        $(this).css('background-image', 'url("' + path + '")').css('background-position', 'initial');
    });


    // Count down setup

    $('.countdown').countdown('2022/04/01', function(event) {
        $(this).html(event.strftime('%D days %H:%M:%S'));
    });


    // Tabbed content 

    $(".block-tabs li").on("click", function() {
        if (!$(this).hasClass("active")) {
            var tabNum = $(this).index();
            var nthChild = tabNum + 1;
            $(".block-tabs li.active").removeClass("active");
            $(this).addClass("active");
            $(".block-tab li.active").removeClass("active");
            $(".block-tab li:nth-child(" + nthChild + ")").addClass("active");

        }
    });



    // Track list player 

    var playlist = $('.album');
    var a = audiojs.create(playlist, {
        trackEnded: function() {
            var next = $('.playlist li.playing').next();
            if (!next.length) next = $('.playlist li').first();
            next.addClass('playing').siblings().removeClass('playing');
            audio1.load($('.as-link', next).attr('data-src'));
            audio1.play();
        }
    });

    var audio = a[0];
    var first = $('.playlist li .as-link').attr('data-src');
    $('.playlist li ').first().addClass('pause');
    audio.load(first);




    $('.playlist li').on("click", function() {
        if ($(this).attr('class') == 'playing') {
            $(this).addClass('pause');
            audio.playPause();
        } else {

            $(this).addClass('playing').removeClass('pause').siblings().removeClass('playing').removeClass('pause');
            audio.load($('.as-link', this).attr('data-src'));
            audio.play();
        }

        return false;

    });


    $('.toggle-lyrics').on('click', function() {
        $(this).closest('.playlist li').find('.block-lyrics').slideToggle();
        $(this).toggleClass('selected');
        return false;
    });



    //Popup elements


    $('.popup-image').magnificPopup({
        type: 'image',
        fixedContentPos: false,
        fixedBgPos: false,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });


    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });




    // Gallery filter


    $('.block-filter li a').on("click", function(e) {

        e.preventDefault();
        $(this).addClass('active');
        $(this).parent().siblings().find('a').removeClass('active');



        var filters = $(this).attr('data-filter');
        $(this).closest('.gallery').find('.block-card').removeClass('disable');

        if (filters !== 'all') {




            var selected = $(this).closest('.gallery').find('.block-card');

            for (var i = 0; i < selected.length; i++) {

                if (!selected.eq(i).hasClass(filters)) {
                    selected.eq(i).addClass('disable');
                }

            }

        }


    });



    // Instagram feed setup

    var instaFeed = new Instafeed({
        get: 'user',
        userId: '8525288462',
        accessToken: '8525288462.c89df6a.5ee63eddf7f148bb9cc56a56edbdc00e',
        limit: 8,
        resolution: 'standard_resolution',
        template: '<li class="list-inline-item"><a class="hover-effect" target="_blank" href="{{link}}"><img src="{{image}}" /></a></li>'
    });
    instaFeed.run();



    //Twitter setup

    var config = {
        "profile": {"screenName": 'mutationthemes'},
        "domId": 'block-tweets',
        "maxTweets": 2,
        "showRetweet": false,
        "showImages": false,
        "showUser": true,
        "showTime": true,
        "customCallback": handleTweets
    };

    function handleTweets(tweets) {
        var x = tweets.length;
        var n = 0;
        var element = $('.block-tweets');
        var listOfTweets = $('<ul>').addClass("slides");
        while (n < x) {
            var thisTweet = $('<li>');
            thisTweet.html(tweets[n]);
            listOfTweets.append(thisTweet);
            n++;
        }
        element.html(listOfTweets);
        $('.block-tweets').flexslider({
            animation: 'slide',
            controlNav: true,
            directionNav: false
        });
        return listOfTweets;
    }
    twitterFetcher.fetch(config);

})(jQuery);

$(document).ready(function() {
    $('#bt1').click(function() {
        $('#fr1').attr('action',
                       'mailto:dyno20@yandex.ru?subject=' +
                       $('#tb1').val());
        $('#fr1').submit();
    });
});