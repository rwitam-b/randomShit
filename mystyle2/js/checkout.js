(function ($) {
    'use strict';

    var cart_data = window.localStorage.cart_data;

    // Payment mode selection check/uncheck operation
    $(".card-header").click(function () {
        $(".card-header").find("i").removeClass("fa-check-circle");
        $(".card-header").find("i").addClass("fa-circle-o");
        $(this).find("i").toggleClass("fa-circle-o");
        $(this).find("i").toggleClass("fa-check-circle")
    });

    $("#town").change(function () {
        var town = $("#town").val();
        var shippingCharge = 0;
        if (town && town == "o") {
            $("#otherArea").removeClass("no-display");
            $("#otherTown").focus();
            shippingCharge = 50;
        } else {
            $("#otherArea").addClass("no-display");
            $("#otherTown").val("");
            if (town == "ip" || town == "ptf" || town == "bp" || town == "nh") {
                shippingCharge = 20;
            }
        }
        if (shippingCharge == 0) {
            $("#shippingCharge").text("Free");
        } else {
            $("#shippingCharge").text("₹" + shippingCharge);
        }
        $("#totalCartValue").text("₹" + (parseFloat(globalCartData.cartValue) + shippingCharge).toFixed(2));
    });

    if (cart_data) {
        // Obtaining cart data from localstorage
        cart_data = JSON.parse(cart_data);

        // Building DOM content based on cart data
        var orderDetails = '<li><span>Product</span> <span>Total</span></li>';
        Object.keys(cart_data).forEach(function (i) {
            var cartObject = cart_data[i];
            orderDetails += '<li><span>' + cartObject.productName + '(' + cartObject.brandName + ') - ' + cartObject.color + ' - ' + cartObject.size + '</span>' +
                ' <span>₹' + cartObject.price + ' x' + cartObject.count + '</span></li>';
        });

        orderDetails += '<li><span>Subtotal</span> <span id="cartValue">₹' + globalCartData.cartValue + '</span></li>';
        orderDetails += '<li><span>Shipping</span> <span id="shippingCharge">Free</span></li>';
        orderDetails += '<li><span>Total</span> <span id="totalCartValue">₹' + globalCartData.cartValue + '</span></li>';

        // Rendering order details to DOM
        $(".order-details-form").html(orderDetails);
    } else {
        window.location.href = "/";
    }
})(jQuery);