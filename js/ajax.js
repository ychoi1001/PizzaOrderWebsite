/*
 *  File name:      ajax.js
 *  Description:    Handles the following tasks (but not limited to):
 *                  - HTML/DOM manipulation
 *                  - AJAX
 *   
 */


//customer id, address and pizza information will be stored in this object
//and these will be sent to orderAjax.php to save in DB
var sendOrders = {
    CustId: "",
    DeliveryStreetAddress: "",
    UnitNum: "",
    DeliveryCity: "",
    DeliveryProvince: "",
    DeliveryPostCode: "",
    PizzaType: [],
    Size: [],
    DoughType: [],
    SauceType: [],
    CheeseType: [],
    Toppings: []
};


$(document).ready(function() {

    // hide everything execpt for the email form
    $("#choosePizza").hide();
    $("#chooseTopping").hide();
    $("#step5Page").hide();
    $("#step6Page").hide();
    $("#step7Page").hide();
    $("#saveUserInfo").hide();
    $("#btnAddAddress").hide();
    $("#newAddressForm").hide();


    // LOG IN **************************************
    // When the user clicks Login button,
    // load data from the server using a HTTP POST request
    $("#emailForm").submit(function(event) {
        // hide email form
        $("#emailForm").hide();
        $("#plzLogIn").hide();
        $("#div1").hide();

        $.post("getUserInfo.php", $(this).serialize(),
            displayUserAddress);
        event.preventDefault();

    });

    // function to run if the Log-in request succeeds
    var displayUserAddress = function(response) {

            $("#plzLogIn").hide();
            $("#btnLogin").hide();
            // $("#btnAddAddress").show();
            // console.log("response received");
            // console.log(response);

            if (response.status == "No email found") {
                $("#div1").show();
                $("#div1").html("No previous orders to list. Please input your delivery address.");

                $("#saveUserInfo").show();

            } else {

                // get the user email, and display it on the top menu bar
                var userEmail = response.customers[0].Email;

                //store CustId in sendOrders object
                sendOrders.CustId = response.customers[0].CustId;

                //response.customers.
                $("#menuLogin").text("Hello " + userEmail + "!");

                if ((response.status == "OK") && ($("#div1").html() == "Please log-in first")) {
                    $("#addressList").html("<table id=\"addressTable\" ></table>");
                }

                $("#addressHeading").html("Select the delivery address");

                addresses(response);

                $("#div1").hide();
                $("#btnAddAddress").show();
            }

        } //end displayUserAddress()


    // SAVE NEW USER INFORMATION********************
    // When the user clicks Save button,
    // load data from the server using a HTTP POST request
    $("#saveUserInfo").submit(function(event) {

        var email = $("#email").val();
        var fullName = $("#fullName").val();
        var phoneNum = $("#phoneNum").val();
        var unitNum = $("#unitNum").val();
        var street = $("#street").val();
        var city = $("#city").val();
        var province = $("#province").val();
        var postalCode = $("#postalCode").val();

        var userInfo = {
            "email": email,
            "fullName": fullName,
            "phoneNum": phoneNum,
            "unitNum": unitNum,
            "street": street,
            "city": city,
            "province": province,
            "postalCode": postalCode
        }

        $.post("saveUserInfo.php", userInfo, saveUserInfo);
        event.preventDefault();

    });

    // function to run if the 'save' request succeeds
    var saveUserInfo = function(response) {

        if (response.status == "NewOK") {

            $("#plzLogIn").hide();
            $("#btnLogin").hide();
            $("#saveUserInfo").hide();
            $("#div1").hide();

            var userEmail = response.customers[0].Email;

            //store CustId in sendOrders object
            sendOrders.CustId = response.customers[0].CustId;
            $("#menuLogin").text("Hello " + userEmail + "!");

            $("#addressHeading").html("Select the delivery address");

            $("#addressList").html("<table id=\"addressTable\" ></table>");

            $("#addressTable").html("<tr><th>Street Address</th><th>Unit Number</th><th>City</th><th>Province</th><th>PostCode</th><th>Select</th></tr>");

            for (r in response.customers) {

                $("#addressTable").append(

                    "<tr><td id='DeliveryStreetAddress_" + r + "'>" + response.customers[r].StreetAddress +
                    "</td><td id='UnitNum_" + r + "'>" + response.customers[r].UnitNum +
                    "</td><td id='DeliveryCity_" + r + "'>" + response.customers[r].City +
                    "</td><td id='DeliveryProvince_" + r + "'>" + response.customers[r].Province +
                    "</td><td id='DeliveryPostCode_" + r + "'>" + response.customers[r].PostCode +
                    "</td><td><button class='BtNext' id='submitAddress' type='button' onclick='chooseAddress(" + r + ")'><span>Next</span></button></td></tr>"
                );

            } // end FOR loop

        }

    }


    //**********************************************
    // ADD NEW, ADDITIONAL DELIVERY ADDRESS ********
    //**********************************************
    $("#btnAddAddress").click(function() {
        $("#newAddressForm").show();
        $("#addressHeading").html("");
    });

    // When the user clicks 'save a new address' button,
    // store address info into sendOrders object
    $("#newAddressForm").submit(function(event) {


        sendOrders.UnitNum = $("#unitNumNew").val();
        sendOrders.DeliveryStreetAddress = $("#streetNew").val();
        sendOrders.DeliveryCity = $("#cityNew").val();
        sendOrders.DeliveryProvince = $("#provinceNew").val();
        sendOrders.DeliveryPostCode = $("#postalCodeNew").val();

        $("#btnAddAddress").hide();
        $("#addressList").hide();
        $("#newAddressForm").hide();
        $("#choosePizza").show();

        event.preventDefault();

    });


});

//This function is for storing address into sendOrders object  
//and show choosePizza section  
function chooseAddress(row) {
    sendOrders.DeliveryStreetAddress = document.getElementById('DeliveryStreetAddress_' + row).innerHTML;
    sendOrders.UnitNum = document.getElementById('UnitNum_' + row).innerHTML;
    sendOrders.DeliveryCity = document.getElementById('DeliveryCity_' + row).innerHTML;
    sendOrders.DeliveryProvince = document.getElementById('DeliveryProvince_' + row).innerHTML;
    sendOrders.DeliveryPostCode = document.getElementById('DeliveryPostCode_' + row).innerHTML;

    $("#btnAddAddress").hide();
    $("#addressList").hide();
    $("#addressListNew").hide();
    $("#newAddressForm").hide();
    $("#choosePizza").show();
    $("#addressHeading").html("");

}

//This function is for storing pizza info into sendOrders object  
//and show chooseTopping section  
function choosePizza() {
    var pizzaType = document.getElementById("pizzaType").value;
    var size = document.getElementById("size").value;
    var doughType = document.getElementById("doughType").value;
    var sauceType = document.getElementById("sauceType").value;
    var cheeseType = document.getElementById("cheeseType").value;

    sendOrders.PizzaType.push(pizzaType);
    sendOrders.Size.push(size);
    sendOrders.DoughType.push(doughType);
    sendOrders.SauceType.push(sauceType);
    sendOrders.CheeseType.push(cheeseType);

    $("#choosePizza").hide();
    $("#chooseTopping").show();



    /* The number of toppings depending on the pizza size  */

    $('input.single-checkbox').on('click', function(evt) {
        var size1 = $('#size').val();
        if ($('.single-checkbox:checked').length > 3 && size1 == "S") {
            this.checked = false;
            alert("Sorry, you can only choose 3 toppings!");
        } else if ($('.single-checkbox:checked').length > 5 && size1 == "M") {
            this.checked = false;
            alert("Sorry, you can only choose 5 toppings!");
        } else if ($('.single-checkbox:checked').length > 7 && size1 == "L") {
            this.checked = false;
            alert("Sorry, you can only choose 7 toppings!");
        }
    });



}

//This function is for storing topping info into sendOrders object  
//and show step5Page
function chooseTopping() {

    var toppings = "";
    toppings += (document.getElementById("GreenOlives").checked == true) ? "GreenOlives, " : "";
    toppings += (document.getElementById("Zucchini").checked == true) ? "Zucchini, " : "";
    toppings += (document.getElementById("Onions").checked == true) ? "Onions, " : "";
    toppings += (document.getElementById("Garlic").checked == true) ? "Garlic, " : "";
    toppings += (document.getElementById("Mushrooms").checked == true) ? "Mushrooms, " : "";
    toppings += (document.getElementById("Pineapple").checked == true) ? "Pineapple, " : "";
    toppings += (document.getElementById("Broccoli").checked == true) ? "Broccoli, " : "";
    toppings += (document.getElementById("Tomatoes").checked == true) ? "Tomatoes, " : "";
    toppings += (document.getElementById("GreenPeppers").checked == true) ? "GreenPeppers, " : "";
    toppings += (document.getElementById("Spinach").checked == true) ? "Spinach, " : "";

    var n = toppings.length; //get rid of , at the end of the text

    toppings = toppings.substr(0, n - 2);
    sendOrders.Toppings.push(toppings);

    //make topping checkbox false
    $(".single-checkbox").prop("checked", false);

    $("#chooseTopping").hide();
    $("#step5Page").show();

    showCurrentOrder();
}

//This function is for storing topping info into sendOrders object  
//and show step5Page
function showCurrentOrder() {
    $("#orderSummary").html("Order Summary");
    var lastIndex = sendOrders.PizzaType.length - 1;
    $("#pizzaTable").html("<tr><th>Pizza Name</th><th>Size</th><th>Dough Type</th><th>Sauce Type</th><th>Cheese Type</th><th>Topping</th></tr>");

    $("#pizzaTable").append(
        "<tr><td>" + sendOrders.PizzaType[lastIndex] +
        "</td><td>" + sendOrders.Size[lastIndex] +
        "</td><td>" + sendOrders.DoughType[lastIndex] +
        "</td><td>" + sendOrders.SauceType[lastIndex] +
        "</td><td>" + sendOrders.CheeseType[lastIndex] +
        "</td><td>" + sendOrders.Toppings[lastIndex] + "</td></tr>"
    );


}

//This function is for going to choosePizza section from step5Page
function addPizza() {
    $("#pizzaTable").html("");
    $("#step5Page").hide();
    $("#choosePizza").show();

}

//This function is for discard current pizza and going to choosePizza section from step5Page
function discardCurrentAndAddPizza() {
    //discard current pizza
    sendOrders.PizzaType.pop();
    sendOrders.Size.pop();
    sendOrders.DoughType.pop();
    sendOrders.SauceType.pop();
    sendOrders.CheeseType.pop();
    sendOrders.Toppings.pop();

    $("#step5Page").hide();
    $("#choosePizza").show();
}

//This function is for discard current pizza and going to step6Page section from step5Page
//and show address and pizza information
function completNotIncludeCurrent() {

    //check if the pizza order is only one
    var emptyPizzaCheck = sendOrders.PizzaType[1];
    if (typeof emptyPizzaCheck !== 'undefined') {
        //discard current pizza
        sendOrders.PizzaType.pop();
        sendOrders.Size.pop();
        sendOrders.DoughType.pop();
        sendOrders.SauceType.pop();
        sendOrders.CheeseType.pop();
        sendOrders.Toppings.pop();

        $("#step5Page").hide();
        $("#step6Page").show();
        $("#orderSummaryFinal").html("Order Summary including Delivery Information");

        $("#finalAddress").html("<tr><th>Street Address</th><th>Unit Number</th><th>City</th><th>Province</th><th>PostCode</th></tr>");
        $("#finalAddress").append(
            "<tr><td>" + sendOrders.DeliveryStreetAddress +
            "</td><td>" + sendOrders.UnitNum +
            "</td><td>" + sendOrders.DeliveryCity +
            "</td><td>" + sendOrders.DeliveryProvince +
            "</td><td>" + sendOrders.DeliveryPostCode +
            "</td></tr>"
        );
        var i = 0;
        $("#finalPizzaTable").html("<tr><th></th><th>Pizza Name</th><th>Size</th><th>Dough Type</th><th>Sauce Type</th><th>Cheese Type</th><th>Topping</th></tr>");
        while (sendOrders.PizzaType[i]) {
            $("#finalPizzaTable").append(
                "<tr><td>" + (i + 1) + "</td><td>" + sendOrders.PizzaType[i] +
                "</td><td>" + sendOrders.Size[i] +
                "</td><td>" + sendOrders.DoughType[i] +
                "</td><td>" + sendOrders.SauceType[i] +
                "</td><td>" + sendOrders.CheeseType[i] +
                "</td><td>" + sendOrders.Toppings[i] + "</td></tr>"
            );
            i++;
        }
    } else {
        alert("You can't order nothing!");
    }

}

//This function is for going to step6Page section from step5Page
//and show address and pizza information
function completeIncludeCurrent() {
    $("#step5Page").hide();
    $("#step6Page").show();
    $("#orderSummaryFinal").html("Order Summary including Delivery Information");

    $("#finalAddress").html("<tr><th>Street Address</th><th>Unit Number</th><th>City</th><th>Province</th><th>PostCode</th></tr>");
    $("#finalAddress").append(
        "<tr><td>" + sendOrders.DeliveryStreetAddress +
        "</td><td>" + sendOrders.UnitNum +
        "</td><td>" + sendOrders.DeliveryCity +
        "</td><td>" + sendOrders.DeliveryProvince +
        "</td><td>" + sendOrders.DeliveryPostCode +
        "</td></tr>"
    );
    var i = 0;
    $("#finalPizzaTable").html("<tr><th></th><th>Pizza Name</th><th>Size</th><th>Dough Type</th><th>Sauce Type</th><th>Cheese Type</th><th>Topping</th></tr>");
    while (sendOrders.PizzaType[i]) {
        $("#finalPizzaTable").append(
            "<tr><td>" + (i + 1) + "</td><td>" + sendOrders.PizzaType[i] +
            "</td><td>" + sendOrders.Size[i] +
            "</td><td>" + sendOrders.DoughType[i] +
            "</td><td>" + sendOrders.SauceType[i] +
            "</td><td>" + sendOrders.CheeseType[i] +
            "</td><td>" + sendOrders.Toppings[i] + "</td></tr>"
        );
        i++;
    }
}

// redirect user to initial page and discard all pizzas in the current order
function cancel() {
    sendOrders.PizzaType = [];
    sendOrders.Size = [];
    sendOrders.DoughType = [];
    sendOrders.SauceType = [];
    sendOrders.CheeseType = [];
    sendOrders.Toppings = [];
    window.location.href = 'index.php';
}

//send sendOrders object to orderAjax.php so that address and pizza information can be stored in DB
//and get order number, status from order callback function
function completeOrder() {
    $("#step6Page").hide();
    $("#step7Page").show();

    $.post("orderAjax.php", sendOrders, order);
}

// Upon the completion of the order, user is given the opportunity to place another order
function placeAnotherOrder() {
    sendOrders.PizzaType = [];
    sendOrders.Size = [];
    sendOrders.DoughType = [];
    sendOrders.SauceType = [];
    sendOrders.CheeseType = [];
    sendOrders.Toppings = [];

    $("#addressHeading").html("Select the delivery address");
    $("#addressList").show();
    //$("#addressListNew").show();

    $("#step6Page").hide();
    $("#step7Page").hide();

    $.post("getAddresses.php", sendOrders, showAddresses);

}


//This is callback function which will get order number and status from orderAjax.php
//and show estimated time which is current time + 40 miniute
var order = function(response) {
    var time = new Date();
    var estimatedTime = new Date(time.setMinutes(time.getMinutes() + 40));
    /* converted estimatedTime to string type, then used substr function to get rid of the part that we don't need */
    var convertedEsTime = (estimatedTime.toString()).substr(0, 25);
    // alert(convertedEsTime);
    if (response.status == "succeed") {
        $("#status").html("Thank you!");
        $("#orderNumber").html("Order #: " + response.orderId);
        document.getElementById("estimatedTime").innerHTML = "Estimated delivery time: " + convertedEsTime;

    } else if (response.status == "failed") {
        $("#status").html("Erro occured");
    }


    console.log(response);

}

//callback function for placeAnotherOrder button
var showAddresses = function(response) {

    if (response.status == "OK") {
        addresses(response);
    } else if (response.status == "No result." || response.status == "CustId is not found.") {
        console.log("An error occured");
    }
    console.log(response);

}

//address list from callback function
function addresses(response) {

    $("#addressTable").html("<tr><th>Street Address</th><th>Unit Number</th><th>City</th><th>Province</th><th>PostCode</th><th>Select</th></tr>");

    for (r in response.customers) {

        $("#addressTable").append(

            "<tr><td id='DeliveryStreetAddress_" + r + "'>" + response.customers[r].DeliveryStreetAddress +
            "</td><td id='UnitNum_" + r + "'>" + response.customers[r].DeliveryUnitNum +
            "</td><td id='DeliveryCity_" + r + "'>" + response.customers[r].DeliveryCity +
            "</td><td id='DeliveryProvince_" + r + "'>" + response.customers[r].DeliveryProvince +
            "</td><td id='DeliveryPostCode_" + r + "'>" + response.customers[r].DeliveryPostCode +
            "</td><td><button class='BtNext' id='submitAddress' type='button' onclick='chooseAddress(" + r + ")'><span>Next</span></button></td></tr>"
        );

    }
    $("#btnAddAddress").show();
}