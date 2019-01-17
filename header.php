<?php

/*
  * File name:    header.php
  *
  * Purpose:      Contains common HTML header part in one file
  *               in order to add the header to new pages easily           
  *
  * Description:  Common HTML header part includes:
  *               - meta tags
  *               - links to CSS and JavaScript files
  *               - navigation bar
  */

session_start();

?>

<!doctype html>

<html lang="en">
  <head>
  <!-- The next few lines tells our browser not to cache the webpage  -->
    <META HTTP-EQUIV="Pragma" CONTENT="no-cache">
    <META HTTP-EQUIV="Expires" CONTENT="0">
    <meta http-equiv="cache-control" content="no-cache">
    <meta charset="utf-8">

    <title>LAMP2 : Pizza Order Project</title>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    
    <script src="./js/ajax.js"></script>
    <link rel="stylesheet" media="all" href="./css/style.css" />
  </head>

  <body>
    
    <nav class="navbar navbar-custom">
      <div class="container-fluid">
        <div class="navbar-header">
        <a class="navbar-brand" href="#">Pizza Parlor</a>
        </div>
        <ul class="nav navbar-nav">
          <li><a href="./index.php">Home</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Deals</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right"><li id="menuLogin"></ul>
        <!-- <ul class="nav navbar-nav navbar-right">
          <li id="menuLogin"><a href="./order.php">
          <span class="glyphicon glyphicon-log-in"></span> Log in</a></li>
        </ul> -->
      </div>
    </nav>
