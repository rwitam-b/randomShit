(function ($) {
    'use strict';

    var $window = $(window);

    // :: Nav Active Code
    if ($.fn.classyNav) {
        $('#essenceNav').classyNav();
    }

    // :: Sliders Active Code
    if ($.fn.owlCarousel) {
        /* $('.popular-products-slides').owlCarousel({
             items: 4,
             margin: 30,
             loop: true,
             nav: false,
             dots: false,
             autoplay: true,
             autoplayTimeout: 5000,
             smartSpeed: 1000,
             responsive: {
                 0: {
                     items: 1
                 },
                 576: {
                     items: 2
                 },
                 768: {
                     items: 3
                 },
                 992: {
                     items: 4
                 }
             }
         });
        $('.product_thumbnail_slides').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ["<img src='img/core-img/long-arrow-left.svg' alt=''>", "<img src='img/core-img/long-arrow-right.svg' alt=''>"],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });*/
    }

    // :: Header Cart Active Code
    var cartbtn1 = $('#essenceCartBtn');
    var cartOverlay = $(".cart-bg-overlay");
    var cartWrapper = $(".right-side-cart-area");
    var cartbtn2 = $("#rightSideCart");
    var cartOverlayOn = "cart-bg-overlay-on";
    var cartOn = "cart-on";

    cartbtn1.on('click', function () {
        cartOverlay.toggleClass(cartOverlayOn);
        cartWrapper.toggleClass(cartOn);
    });
    cartOverlay.on('click', function () {
        $(this).removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
    });
    cartbtn2.on('click', function () {
        cartOverlay.removeClass(cartOverlayOn);
        cartWrapper.removeClass(cartOn);
    });

    // :: ScrollUp Active Code
    if ($.fn.scrollUp) {
        $.scrollUp({
            scrollSpeed: 1000,
            easingType: 'easeInOutQuart',
            scrollText: '<i class="fa fa-angle-up" aria-hidden="true"></i>'
        });
    }

    // :: Sticky Active Code
    $window
        .on('scroll', function () {
            if ($window.scrollTop() > 0) {
                $('.header_area').addClass('sticky');
            } else {
                $('.header_area').removeClass('sticky');
            }
        });

    // :: Nice Select Active Code
    /*if ($.fn.niceSelect) {
        $('select').niceSelect();
    }*/

    // :: Slider Range Price Active Code
    $('.slider-range-price').each(function () {
        var min = jQuery(this).data('min');
        var max = jQuery(this).data('max');
        var unit = jQuery(this).data('unit');
        var value_min = jQuery(this).data('value-min');
        var value_max = jQuery(this).data('value-max');
        var label_result = jQuery(this).data('label-result');
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [
                value_min, value_max
            ],
            slide: function (event, ui) {
                var result = label_result + " " + unit + ui.values[0] + ' - ' + unit + ui.values[1];
                console.log(t);
                t
                    .closest('.slider-range')
                    .find('.range-price')
                    .html(result);
            }
        });
    });

    // :: Favorite Button Active Code
    var favme = $(".favme");

    favme.on('click', function () {
        $(this).toggleClass('active');
    });

    favme.on('click touchstart', function () {
        $(this).toggleClass('is_animating');
    });

    favme.on('animationend', function () {
        $(this).toggleClass('is_animating');
    });

    // :: Nicescroll Active Code
    if ($.fn.niceScroll) {
        $(".cart-list, .cart-content").niceScroll();
    }

    // :: wow Active Code
    if ($window.width() > 767) {
        new WOW().init();
    }

    // :: Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: PreventDefault a Click
    $("a[href='#']")
        .on('click', function ($) {
            $.preventDefault();
        });

    function makeAjax(url, type) {
        return $.ajax({
            url: url,
            type: type,
            crossDomain: true
        });
    }

    // "Show Collection" button scroll down animation
    $("#show-collection").click(function () {
        $('html, body').animate({
            scrollTop: $("#productCategoryArea").offset().top - $("body").offset().top
        }, 1000);
    });
    // ## window functions ##

    function makeAjax(url, type) {

        return $.ajax({
            url: url,
            type: type,
            crossDomain: true
        });
    }

    function getQuery(url) {

        var queries = {},
            queryStringSpliter = url.split("?")[1],
            singleItems = null;
        if (queryStringSpliter) {

            singleItems = queryStringSpliter.split("&");
            singleItems.forEach(function (items) {

                var query = items.split("=");
                queries[query[0]] = query[1];
            });
        }
        return queries;
    }

    function updateCart(cartProductId, cartObject, operation) {
        // Updating cart data to local storage
        if (operation && operation == "ADD") {
            // Add to cart operation
            if (cartProductId && cartObject) {
                if (window.localStorage.getItem("cart_data")) {
                    var cart_data = JSON.parse(window.localStorage.getItem("cart_data"));
                    if (cart_data[cartProductId]) {
                        cart_data[cartProductId].count += 1;
                    } else {
                        cart_data[cartProductId] = cartObject;
                    }
                    window.localStorage.setItem("cart_data", JSON.stringify(cart_data));
                } else {
                    var cart_data = new Object();
                    cart_data[cartProductId] = cartObject;
                    window.localStorage.setItem("cart_data", JSON.stringify(cart_data));
                }
            }
            // Rendering to DOM
            renderCart(JSON.parse(window.localStorage.getItem("cart_data")));
        } else if (operation && operation == "REMOVE" && cartProductId) {
            // Remove from cart operation
            if (window.localStorage.getItem("cart_data")) {
                var cart_data = JSON.parse(window.localStorage.getItem("cart_data"));
                delete cart_data[cartProductId];
                window.localStorage.setItem("cart_data", JSON.stringify(cart_data));

                // Rendering to DOM
                renderCart(JSON.parse(window.localStorage.getItem("cart_data")));
            }
        }
    }

    function removeFromCart(elem) {
        var cartItemDiv = elem.parentElement.parentElement.parentElement;
        // Clear From Local Storage
        updateCart(cartItemDiv.id, null, "REMOVE");
    }

    function addToCart() {
        // Getting current page product details from local storage        
        var currentProduct = JSON.parse(window.localStorage.getItem("mystyle_curr_prod"));

        // Constructing cart object        
        var cartObject = {
            "count": 1,
            "image": currentProduct.imageUrls[Math.floor(Math.random() * currentProduct.imageUrls.length)],
            "color": $("#productColor")
                .next()
                .find(".current")
                .html()
                .split(":")[1]
                .trim(),
            "size": $("#productSize")
                .next()
                .find(".current")
                .html()
                .split(":")[1]
                .trim(),
            "brandName": currentProduct.brandName,
            "productId": currentProduct.productId,
            "productName": currentProduct.productName,
            "price": currentProduct.discountedPrice
        };
        // Update cart data in local storage
        updateCart(cartObject.color + cartObject.size + cartObject.productId, cartObject, "ADD");
    }

    function renderCart(cart_data) {
        // Clearing existing rendered cart elements
        $(".cart-list").html("");
        if (cart_data) {
            var itemCount = Object.keys(cart_data).length;
            var cartValue = 0;
            // Cart items rendering
            Object.keys(cart_data).forEach(function (i) {
                var cartObject = cart_data[i];
                var template = '<!-- Single Cart Item -->' +
                    '<div class="single-cart-item" id="' + cartObject.color + cartObject.size + cartObject.productId + '">' +
                    '<div class="product-image">' +
                    '<img src="' + cartObject.image + '" class="cart-thumb" alt="">' +
                    '<!-- Cart Item Desc -->' +
                    '<div class="cart-item-desc">' +
                    '<span class="product-remove" onclick="removeFromCart(this)"><i class="fa fa-close" aria-hidden="true"></i></span>' +
                    '<span class="badge">' + cartObject.brandName + '</span>' +
                    '<a href="single-product-details.html?product_id=' + cartObject.productId + '"><h6>' + cartObject.productName + '</h6></a>' +
                    '<p class="size">Size: ' + cartObject.size + '</p>' +
                    '<p class="color">Color: ' + cartObject.color + '</p>' +
                    '<p class="color">Number: ' + cartObject.count + '</p>' +
                    '<p class="price">₹' + cartObject.price + '</p>' +
                    '</div></div></div>';
                $(".cart-list").append(template);
            });

            // Calculating cart valuation
            Object.keys(cart_data).forEach(function (i) {
                cartValue += cart_data[i].price;
            });

            // Cart item count rendering
            $(".cart-amount").each(function () {
                $(this).html(itemCount);
            });

            // Cart Summary rendering
            $(".cartValue").each(function () {
                $(this).html("₹" + (cartValue.toFixed(2)));
            });
        }
    }

    // Rendering cart data into DOM from local storage on fresh page load
    //$(document).ready(function () {
    var cart_data = window.localStorage.cart_data;
    if (cart_data) {
        renderCart(JSON.parse(cart_data));
    }
    //});

    window.makeAjax = makeAjax;
    window.getQuery = getQuery;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;

})(jQuery);