(function($) {
    'use strict';

    var queryString = getQuery(window.location.href);
    if (queryString.category) {

        $(".page-header").html(queryString.category);

        function renderTemplate(content) {
            
            var template = '<!-- Single Product -->' +
                '<div class="col-12 col-sm-6 col-lg-4" id=' + content.details.id + '>' +
                '<div class="single-product-wrapper">' +
                '<!-- Product Image -->' +
                '<div class="product-img">' +
                '<a href="single-product-details.html?product_id=' + content.details.id + '">' +
                '<img src="' + content.images[0] + '" alt="">' +
                '</a>' +
                '<!-- Hover Thumb -->' +
                '<a href="single-product-details.html?product_id=' + content.details.id + '">' +
                '<img class="hover-img" src="' + content.images[1] + '" alt="">' +
                '</a>' +
                '<!-- Product Badge -->' +
                '<!--div class="product-badge new-badge">' +
                '<span>New</span>' +
                '</div-->' +
                '<!-- Favourite -->' +
                '<div class="product-favourite">' +
                '<a href="#" class="favme fa fa-heart"></a>' +
                '</div>' +
                '</div>' +
                '<!-- Product Description -->' +
                '<div class="product-description">' +
                '<span>' + content.details.brandName + '</span>' +
                '<a href="single-product-details.html?product_id=' + content.details.id + '">' +
                '<h6>' + content.details.productName + '</h6>' +
                '</a>' +
                '<p class="product-price">&#x20b9;' + content.details.newPrice + '&nbsp; &nbsp;<span class="old-price">&#x20b9;' + content.details.oldPrice + '</span></p>' +
                '</div>' +
                '</div>' +
                '</div>';
            return template;
        }

        var xhrObj = makeAjax("../response/all_tshirt.json", "get");
        xhrObj.done(function(res) {
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
                $(".product-list").append(domContent);
            });
            $(".amount-of-items").html(res.length);
        });
    } else {
        window.location.href = "/home.html";
    }
})(jQuery);