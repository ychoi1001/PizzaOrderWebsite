<?php

/*
 * File name:     orderAjax.php
 * Purpose:       Saves the user's order details in DB
 *                
 */

session_start();
header("Content-Type: application/json");

// include a php file containing functions and DB credentials
require_once ('initialize.php');

$db_conn = connect_db();

$orderId=saveOrders($db_conn);

$status=saveOrderDetails($db_conn,$orderId);

//print json string( succeed or failed) depend on the result
echo $status;

disconnect_db($db_conn);

//save CustId and address info in Orders table
function saveOrders($db_conn){
    $CustId = $db_conn->real_escape_string($_REQUEST['CustId']);
    $DeliveryStreetAddress = $db_conn->real_escape_string($_REQUEST['DeliveryStreetAddress']);
    $DeliveryUnitNum = $db_conn->real_escape_string($_REQUEST['UnitNum']);
    $DeliveryCity = $db_conn->real_escape_string($_REQUEST['DeliveryCity']);
    $DeliveryProvince = $db_conn->real_escape_string($_REQUEST['DeliveryProvince']);
    $DeliveryPostCode = $db_conn->real_escape_string($_REQUEST['DeliveryPostCode']);

    $qry="INSERT INTO orders SET CustId=" .$CustId  ." , DeliveryStreetAddress='" .$DeliveryStreetAddress 
    ."', DeliveryUnitNum='" .$DeliveryUnitNum ."', DeliveryCity='" .$DeliveryCity 
    ."', DeliveryProvince='" .$DeliveryProvince ."', DeliveryPostCode='" .$DeliveryPostCode ."';"; 
    
    $db_conn->query($qry);

    //find OrderId for saving OrderDetails
    $qry="SELECT LAST_INSERT_ID();";
    $rs = $db_conn->query($qry);

    if ($rs->num_rows > 0){
        while ($row = $rs->fetch_assoc()){
            $orderId= $row;
        }
    }
    //return OrderId for saving OrderDetails
    return $orderId["LAST_INSERT_ID()"];
}

//save pizza order info in Order_Details DB
function saveOrderDetails($db_conn,$orderId){
    $length=count($_REQUEST['PizzaType']);
    for($i=0;$i<$length;$i++){
        
        $PizzaType = $db_conn->real_escape_string($_REQUEST['PizzaType'][$i]);
        $Size = $db_conn->real_escape_string($_REQUEST['Size'][$i]);
        $DoughType = $db_conn->real_escape_string($_REQUEST['DoughType'][$i]);
        $SauceType = $db_conn->real_escape_string($_REQUEST['SauceType'][$i]);
        $CheeseType = $db_conn->real_escape_string($_REQUEST['CheeseType'][$i]);
        $Toppings = $db_conn->real_escape_string($_REQUEST['Toppings'][$i]);
        $PizzaType = $db_conn->real_escape_string($_REQUEST['PizzaType'][$i]);


        $qry="INSERT INTO order_details SET OrderId=" .$orderId ." , PizzaType='" .$PizzaType
         ."', SizeType='" .$Size ."', DoughType='" .$DoughType 
         ."', SauceType='" .$SauceType ."', CheeseType='" .$CheeseType 
         ."', Toppings='" .$Toppings ."';"; 
    
         $rs = $db_conn->query($qry);
   
    }
    if($rs==true){
        return  '{ "status": "succeed", "orderId":"' .$orderId  .'" }';
    }
    else{
        return '{ "status": "failed" }';
    }
    
}


?>
