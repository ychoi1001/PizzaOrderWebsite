<?php

/*
 * File name:     saveUserInfo.php
 * 
 * Purpose:       Saves new user information (such as name and address) in DB
 *                
 */

header("Content-Type: application/json");

// include a php file containing functions and DB credentials
require_once ('initialize.php');

/*
 * Function:    saveUserInfo()
 * Purpose:     Saves new user information in DB
 * Return:      an array of the user's addersses including the newly added address,
 *              or an error message in case any error occurs
 */
saveUserInfo();

?>