-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2021-01-18 16:16:34
-- 服务器版本： 10.1.25-MariaDB
-- PHP Version: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE `account` (
  `id` bigint(12) NOT NULL COMMENT '主键id',
  `username` varchar(50) COLLATE utf8_bin NOT NULL COMMENT '用户名称',
  `password` varchar(250) COLLATE utf8_bin NOT NULL COMMENT '密码',
  `platform` int(11) DEFAULT NULL COMMENT '平台',
  `is_role` tinyint(4) NOT NULL DEFAULT '0' COMMENT '角色类型：1 超级管理员 0 不是',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除，-1 表示删除 0 表示正常',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='账户表';

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `platform`, `is_role`, `is_del`, `updated_time`, `created_time`) VALUES
(3, 'admin', '$2b$10$u7bjh4n/llTHyknz6FNdxeBHdbgxQ5qKxFWNrxR6WnnQZ6uJAuaiO', NULL, 1, 0, '2021-01-17 10:08:50', '2021-01-17 07:51:33'),
(4, 'admin001', '$2b$10$mPVFl/CogDeDn.GdXnI9c.V48QuxJujz5ZNm/VpLYNI8/N7Ihwmni', NULL, 0, 0, '2021-01-17 10:27:03', '2021-01-17 10:27:03');

-- --------------------------------------------------------

--
-- 表的结构 `account_roles`
--

CREATE TABLE `account_roles` (
  `id` bigint(12) NOT NULL COMMENT '主键id',
  `account_id` bigint(12) NOT NULL COMMENT '用户id',
  `role_id` bigint(12) NOT NULL COMMENT '角色id',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除，-1 表示删除 0 表示正常',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='账户角色关系表';

-- --------------------------------------------------------

--
-- 表的结构 `menus`
--

CREATE TABLE `menus` (
  `id` bigint(12) NOT NULL COMMENT '主键id',
  `menu_name` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '菜单名称',
  `action_name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '操作名称',
  `icon` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT 'icon图标',
  `url` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT 'url地址',
  `parent_menu_id` int(11) DEFAULT '-1' COMMENT '父模块id',
  `sort` int(4) DEFAULT '1' COMMENT '排序',
  `description` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除，-1 表示删除 0 表示正常',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='菜单表';

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT '主键',
  `uuid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'uuid+时间戳',
  `product_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '商品名称',
  `product_code` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '商品编码',
  `product_price` decimal(10,2) NOT NULL COMMENT '商品价格',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态 1 正常 0 禁用 -1 逻辑删除',
  `modified_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '数据创建时间',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '数据修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `uuid`, `product_name`, `product_code`, `product_price`, `status`, `modified_time`, `created_time`) VALUES
(1, 'uuid-1607774305041', '菠萝蜜', '1607774305041', '7.00', 1, '2020-12-12 12:17:25', '2020-12-12 11:58:23'),
(2, 'uuid-1607774304091', '苹果', '1607774304091', '4.00', 1, '2020-12-12 12:17:30', '2020-12-12 11:58:24'),
(3, 'uuid-1607774305042', '奇异果', '1607774305042', '3.00', 1, '2020-12-12 12:17:34', '2020-12-12 11:58:25'),
(4, 'uuid-1607774469465', '猕猴桃', '1607774469465', '3.00', 1, '2020-12-12 12:17:38', '2020-12-12 12:01:09'),
(5, 'uuid-1607774572584', '菠萝', '1607774572584', '4.00', 1, '2020-12-12 12:17:41', '2020-12-12 12:02:52'),
(6, 'uuid-1607774618219', '鸭梨', '1607774618219', '2.00', 1, '2020-12-12 12:17:45', '2020-12-12 12:03:38'),
(8, 'uuid-1607775517822', '榴莲', '1607775517822', '13.00', 1, '2020-12-12 12:18:37', '2020-12-12 12:18:37'),
(9, 'uuid-1607775674593', '新鲜草莓', '1607775674593', '7.60', 1, '2020-12-12 13:59:27', '2020-12-12 12:21:14'),
(10, 'uuid-1607781439072', '芒果', '1607781439072', '8.00', 1, '2020-12-12 13:58:35', '2020-12-12 13:57:19'),
(11, 'uuid-1607851364521', '新鲜龙眼', '1607851364534', '7.20', 1, '2020-12-13 09:22:44', '2020-12-13 09:22:44'),
(12, 'uuid-1609857756302', '长白山雪莲果', '1609857756302', '3.60', 1, '2021-01-05 14:44:44', '2021-01-05 14:42:36');

-- --------------------------------------------------------

--
-- 表的结构 `roles`
--

CREATE TABLE `roles` (
  `id` bigint(12) NOT NULL COMMENT '主键id',
  `role_name` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '角色名称',
  `description` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除，-1 表示删除 0 表示正常',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='菜单表';

-- --------------------------------------------------------

--
-- 表的结构 `roles_menus`
--

CREATE TABLE `roles_menus` (
  `id` bigint(12) NOT NULL COMMENT '主键id',
  `role_id` bigint(12) NOT NULL COMMENT '角色id',
  `menu_id` bigint(12) NOT NULL COMMENT '菜单id',
  `is_del` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否删除，-1 表示删除 0 表示正常',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='菜单表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `account_roles`
--
ALTER TABLE `account_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles_menus`
--
ALTER TABLE `roles_menus`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `account`
--
ALTER TABLE `account`
  MODIFY `id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '主键id', AUTO_INCREMENT=5;
--
-- 使用表AUTO_INCREMENT `account_roles`
--
ALTER TABLE `account_roles`
  MODIFY `id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '主键id';
--
-- 使用表AUTO_INCREMENT `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '主键id';
--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '主键id';
--
-- 使用表AUTO_INCREMENT `roles_menus`
--
ALTER TABLE `roles_menus`
  MODIFY `id` bigint(12) NOT NULL AUTO_INCREMENT COMMENT '主键id';COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
