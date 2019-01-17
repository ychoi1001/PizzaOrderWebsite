<?php 

/*
 * Course:          INFO 5094 LAMP 2
 * Project:         Pizza Order Web Site using AJAX
 * Submission:      2018-April-14
 * 
 * Group Members:   
 *                  Hyeonguk Shin
 *                  Minah Lee
 *                  Joohyun Hwang
 *                  Yeonsil Choi
 */


 /*
  * File name:     index.php
  * Purpose:       Provides the following:
  *                - a welcome message
  *                - instructions on how to use the site.
  *                - a button to begin the ordering process                
  */

  
// include a php file containing functions and DB credentials
require_once('initialize.php'); ?>


<?php include('header.php'); ?>

<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-md-5">
            <h2>Welcome to Fanshawe Pizza Parlor!</h2>
            <h3>Order your favorite pizzas online.</h3>

            <ul class="intro-list">
            <li>Please click the Start button below to start the order process.</li>
            <li>Log in with your email address. If this is your first time to order from our website,
            provide us with a delivery information including name, phone number, and address.</li>
            <li>Select the location for delivery. Proceed to pizza order process.</li>
            <li>Make your selection and complete the order. Your pizza is on the way!</li>
            </ul>
        </div>

        <div class="col-xs-12 col-md-5">
            <img src="./images/shopOpen.png" alt="shop_open" style="width:100%">
        </div>
    </div>
    
    <a href="./order.php" class="btn btn-info" style="width:80px;height:40px;font-size:1.2em;">Start</a>
</div>

<?php include('footer.php'); ?>