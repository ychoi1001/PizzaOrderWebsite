drop database if exists lamp2project;
create database if not exists lamp2project;

drop user if exists 'lamp2project'@'localhost';
grant all privileges on lamp2project.* to 'lamp2project'@'localhost' identified by 'lamp2project';

use lamp2project;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- DB Tables
--

CREATE TABLE `customers` (
  `CustId` int(11) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `UnitNum` varchar(10) DEFAULT NULL,
  `StreetAddress` varchar(50) NOT NULL,
  `City` varchar(20) NOT NULL,
  `Province` varchar(20) NOT NULL,
  `PostCode` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




CREATE TABLE `orders` (
  `OrderId` int(8) NOT NULL,
  `CustId` int(11) DEFAULT NULL,
  `OrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DeliveryStreetAddress` varchar(50) NOT NULL,
  `DeliveryUnitNum` varchar(10) DEFAULT NULL,
  `DeliveryCity` varchar(20) DEFAULT NULL,
  `DeliveryProvince` varchar(20) DEFAULT NULL,
  `DeliveryPostCode` varchar(10) DEFAULT NULL,
  `EDT` datetime DEFAULT NULL,
  `TotalPaid` float(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `order_details` (
  `Order_detail_Id` int(11) NOT NULL,
  `OrderId` int(8) NOT NULL,
  `PizzaType` varchar(50) NOT NULL,
  `SizeType` varchar(15) NOT NULL,
  `DoughType` varchar(15) NOT NULL,
  `SauceType` varchar(15) NOT NULL,
  `CheeseType` varchar(20) DEFAULT NULL,
  `Toppings` varchar(100) DEFAULT NULL,
  `Price` float(5,2) DEFAULT NULL,
  `Quantity` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- ADD table constraints --
ALTER TABLE `customers`
  ADD PRIMARY KEY (`CustId`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderId`),
  ADD KEY `CustId` (`CustId`);

ALTER TABLE `order_details`
  ADD PRIMARY KEY (`Order_detail_Id`),
  ADD KEY `OrderId` (`OrderId`);

ALTER TABLE `customers`
  MODIFY `CustId` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `orders`
  MODIFY `OrderId` int(8) NOT NULL AUTO_INCREMENT;

ALTER TABLE `order_details`
  MODIFY `Order_detail_Id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`CustId`) REFERENCES `customers` (`CustId`);

ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`OrderId`) REFERENCES `orders` (`OrderId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
