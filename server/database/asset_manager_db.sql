-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 30, 2024 at 06:40 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asset_manager_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `other_name` varchar(100) DEFAULT NULL,
  `employee_id` varchar(20) NOT NULL,
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `department` varchar(100) DEFAULT NULL,
  `position` varchar(150) DEFAULT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `employee_id` varchar(20) NOT NULL,
  `login_id` int(11) NOT NULL,
  `ip_address` varchar(25) NOT NULL,
  `logged_in_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `logged_out_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `user_id`, `employee_id`, `login_id`, `ip_address`, `logged_in_at`, `logged_out_at`) VALUES
(1, 1, 'EXP-1000069', 0, '::1', '2024-08-30 06:19:53', '2024-08-30 06:19:53'),
(2, 1, 'EXP-1000069', 1725015044, '::1', '2024-08-30 10:50:44', NULL),
(3, 1, 'EXP-1000069', 1725015279, '::1', '2024-08-30 10:54:39', NULL),
(4, 1, 'EXP-1000069', 1725015341, '::1', '2024-08-30 10:55:41', NULL),
(5, 1, 'EXP-1000069', 1725019868, '::1', '2024-08-30 12:11:08', NULL),
(6, 1, 'EXP-1000069', 1725020540, '::1', '2024-08-30 12:22:20', NULL),
(7, 1, 'EXP-1000069', 1725022839, '::1', '2024-08-30 13:00:39', NULL),
(8, 1, 'EXP-1000069', 1725023103, '::1', '2024-08-30 13:05:03', NULL),
(9, 1, 'EXP-1000069', 1725023166, '::1', '2024-08-30 13:06:06', NULL),
(10, 1, 'EXP-1000069', 1725023515, '::1', '2024-08-30 13:11:55', NULL),
(11, 1, 'EXP-1000069', 1725023599, '::1', '2024-08-30 13:13:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `types` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `priority` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `types`, `description`, `priority`) VALUES
(1, 'SYSTEM_ADMIN', 'None yet', 1),
(2, 'EDITOR', 'None yet', 2),
(3, 'DEVICE_ASSIGNER', 'None yet', 3),
(4, 'REVIEWER', 'None yet', 4);

-- --------------------------------------------------------

--
-- Table structure for table `roles_assigned`
--

CREATE TABLE `roles_assigned` (
  `id` int(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `employee_id` varchar(20) NOT NULL,
  `role_type` varchar(50) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `added_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `employee_id` varchar(20) DEFAULT NULL,
  `email_address` varchar(300) NOT NULL,
  `encrypted_password` varchar(100) NOT NULL,
  `password_salt` varchar(150) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `login_otp` varchar(10) DEFAULT NULL,
  `registered_by_user_id` int(11) DEFAULT NULL,
  `registered_on` timestamp NULL DEFAULT current_timestamp(),
  `updated_on` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `employee_id`, `email_address`, `encrypted_password`, `password_salt`, `status`, `login_otp`, `registered_by_user_id`, `registered_on`, `updated_on`) VALUES
(1, 'EXP-1000069', 'kojo.email@gmail.com', 'b2b86e64e9abed610d55a2863a15e54f', '$2y$10$5hax5TVT3DrIyiG/cxSQkeoPbWnRNRXAopb8zpPA4m1tKATRBBHDm', 'ACTIVE', '388033', NULL, '2024-08-29 15:30:27', '2024-08-29 16:25:48'),
(2, 'EXP-1000070', 'kukua.crentsil@gmail.com', '70622084f63cc61179646f795f4e5fad', '$2y$10$WXLhXbHIM07v4T5B.QPPk.v4YKGseg.3rHuUpLNRejRZZubzsj5HK', 'ACTIVE', NULL, 1, '2024-08-30 07:05:48', NULL),
(5, 'EXP-1000071', 'k.wusu@gmail.com', '136df9945b851a1c4e777f86659c95c5', '$2y$10$iMmOU3PHiUkfGueFGyJijuJs2EeK3Qa.9xi68pipVDG/85l09Fn1a', 'ACTIVE', NULL, 1, '2024-08-30 13:24:09', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `login_id` (`login_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles_assigned`
--
ALTER TABLE `roles_assigned`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_address` (`email_address`),
  ADD UNIQUE KEY `employee_id` (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles_assigned`
--
ALTER TABLE `roles_assigned`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
