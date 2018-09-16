(function($) {
    'use strict';


    function renderTemplate(content) {

        var template = '<!-- Single Product -->' +
            '<div class="single-product-wrapper">' +
            '<!-- Product Image -->' +
            '<div class="product-img">' +
            '<a href="single-product-details.html?product_id=' + content.details.id + '">' +        
            '<img src="' + content.images[0] + '" alt="">' +
            '</a>'+
            '<!-- Hover Thumb -->' +
            '<a href="single-product-details.html?product_id=' + content.details.id + '">' +        
            '<img class="hover-img" src="' + content.images[1] + '" alt="">' +
            '</a>'+
            '<!-- Product Badge -->' +
            '<!--div class="product-badge new-badge">' +
            '<span>New</span>' +
            '</div-->' +            
            '</div>' +
            '<!-- Product Description -->' +
            '<div class="product-description">' +
            '<span>' + content.details.brandName + '</span>' +
            '<a href="single-product-details.html?product_id=' + content.details.id + '">' +        
            '<h6>' + content.details.productName + '</h6>' +
            '</a>' +
            '<p class="product-price">&#x20b9;' + content.details.newPrice + '&nbsp; &nbsp;<span class="old-price">&#x20b9;' + content.details.oldPrice + '</span></p>' +            
            '</div>' +
            '</div>';
        return template;
    }

    var xhrObj = makeAjax("../response/top6.json", "get");
    xhrObj.done(function(res) {
        // Local run
        res = JSON.parse(res);
        var domContent = null;
        res.forEach(function(items) {

            var singleProductDetails = {};
            singleProductDetails = {
                "images": items.imageUrls,
                "details": {
                    "id": items.productId,
                    "brandName": items.brandName,
                    "productName": items.productName,
                    "oldPrice": items.actualPrice,
                    "newPrice": items.discountedPrice,
                }
            }
            var domContent = renderTemplate(singleProductDetails);
            $(".product-items").append(domContent);
        });
        // :: Sliders Active Code
        if ($.fn.owlCarousel) {
            $('.popular-products-slides').owlCarousel({
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
        }
    });

    /*$(".catagory-content").on("click", ".category", function(e) {

        var params = {
            "category": $(this).text()
        }
        history.pushState(params, "", "?category" + $(this).text());
        window.location.href = "/shop.html?category=" + $(this).text();
    });*/

})(jQuery);