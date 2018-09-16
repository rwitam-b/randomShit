(function ($) {
    'use strict';

    var queryString = getQuery(window.location.href);
    if (queryString.product_id) {

        var xhrObj = makeAjax("../response/prod_ids.json", "get");
        xhrObj.done(function (itemDetail) {
            // Local run
            itemDetail = JSON.parse(itemDetail);
            var imagesList,
                colorList,
                sizeList,
                itemDetails = itemDetail[queryString.product_id];                

            // Keeping data of current page product to avoid AJAX call during "Add To Cart"
            window.localStorage.setItem("mystyle_curr_prod", JSON.stringify(itemDetails));
            itemDetails.imageUrls.forEach(function (singleImages) {

                if (!imagesList) {
                    imagesList = '<img class="single-image-item" src="' + singleImages + '" alt="">';
                } else {
                    imagesList += '<img class="single-image-item" src="' + singleImages + '" alt="">';
                }
            });
            $(".product-images").html(imagesList);
            $('.product_thumbnail_slides').owlCarousel({
                items: 1,
                margin: 0,
                loop: itemDetails.imageUrls.length > 1,
                nav: true,
                navText: ["<img src='img/core-img/long-arrow-left.svg' alt=''>", "<img src='img/core-img/long-arrow-right.svg' alt=''>"],
                dots: false,
                autoplay: true,
                autoplayTimeout: 5000,
                smartSpeed: 1000
            });
            $(".brand-name").html(itemDetails.brandName);
            $(".product-name").html(itemDetails.productName);
            $(".product-price").html("&#x20b9;" + itemDetails.discountedPrice + "&nbsp; &nbsp;<span>&#x20b9;" + itemDetails.actualPrice + "</span>");
            if (itemDetails.specs.color) {
                itemDetails.specs.color.forEach(function (color) {

                    if (!colorList) {
                        colorList = '<option value="value">Color: ' + color + '</option>';
                    } else {
                        colorList += '<option value="value">Color: ' + color + '</option>';
                    }
                });
                $("#productColor").html(colorList);
                $("#productColor").niceSelect();
            } else {
                $("#productColor").hide();
            }
            if (itemDetails.specs.size) {
                itemDetails.specs.size.forEach(function (size) {

                    if (!sizeList) {
                        sizeList = '<option value="value">Size: ' + size + '</option>';
                    } else {
                        sizeList += '<option value="value">Size: ' + size + '</option>';
                    }
                });
                $("#productSize").html(sizeList);
                $("#productSize").niceSelect();
            } else {
                $("#productSize").hide();
            }
        });

    } else {
        window.location.href = "/";
    }
})(jQuery);