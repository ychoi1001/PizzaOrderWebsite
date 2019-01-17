<?php

/*
 * File name:     getUserInfo.php
 * 
 * Purpose:       User Validation on Server Side
 * Description:   When the user clicks 'Login' button,
 *                checks if the email address entered by the user alraedy exists in DB.
 *                If yes, it sends the previously used delivery addresses to the browser.
 *                If not, it sends out an error message saying "No email found".
 */

session_start();
header("Content-Type: application/json");


// include a php file containing functions and DB credentials
require_once ('initialize.php');


/*
 * Function:    getUserInfo()
 * Purpose:     User validation on Server Side
 * Return:      If the user's email already exists in DB, returns an array of the user's addersses.
 *              If not, sends an error message saying "No email found"
 */
getUserInfo();

?>