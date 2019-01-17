<?php

/*
 * File name:     getAddresses.php
 * Purpose:       Retrieves the user's delivery addresses from DB
 *                
 */


header("Content-Type: application/json");

// include a php file containing functions and DB credentials
require_once ('initialize.php');


/*
 * Function:    getAddresses()
 * Purpose:     Retrieves the user's delivery addresses from DB, and sends them to the browser
 * Return:      Returns all of the user's addersses,
 *              or an error message in case any error occurs
 */
getAddresses();

?>