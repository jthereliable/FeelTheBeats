-- phpMyAdmin SQL Dump
-- version 3.5.8.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 03, 2013 at 05:54 PM
-- Server version: 5.5.31-0ubuntu0.13.04.1
-- PHP Version: 5.4.9-4ubuntu2

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ftb3`
--

-- --------------------------------------------------------

--
-- Table structure for table `Artists`
--

DROP TABLE IF EXISTS `Artists`;
CREATE TABLE IF NOT EXISTS `Artists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `url` varchar(512) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Badges`
--

DROP TABLE IF EXISTS `Badges`;
CREATE TABLE IF NOT EXISTS `Badges` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `sid` int(11) unsigned NOT NULL COMMENT 'Song ID',
  `name` varchar(64) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  `conditions` tinytext NOT NULL COMMENT 'JSON of conditions',
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Charts`
--

DROP TABLE IF EXISTS `Charts`;
CREATE TABLE IF NOT EXISTS `Charts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sid` int(10) unsigned NOT NULL COMMENT 'Song ID',
  `uid` int(10) unsigned NOT NULL COMMENT 'Charter user ID',
  `name` varchar(64) NOT NULL,
  `url` varchar(255) NOT NULL,
  `order` tinyint(3) unsigned NOT NULL COMMENT 'Sorting order of the chart',
  PRIMARY KEY (`id`),
  KEY `sid` (`sid`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `frm_Categories`
--

DROP TABLE IF EXISTS `frm_Categories`;
CREATE TABLE IF NOT EXISTS `frm_Categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `frm_Categories`
--

INSERT INTO `frm_Categories` (`id`, `name`) VALUES
(1, 'Administrative'),
(2, 'Feel the Beats'),
(3, 'Games'),
(4, 'Off-Topic');

-- --------------------------------------------------------

--
-- Table structure for table `frm_Forums`
--

DROP TABLE IF EXISTS `frm_Forums`;
CREATE TABLE IF NOT EXISTS `frm_Forums` (
  `fid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category` int(11) unsigned NOT NULL COMMENT 'Category ID',
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `last_post` int(11) unsigned DEFAULT NULL COMMENT 'Last Post ID',
  `view_mod_level_min` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `post_mod_level_min` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `view_charter_level_min` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `post_charter_level_min` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `hidden` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`fid`),
  KEY `category` (`category`),
  KEY `last_post` (`last_post`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- RELATIONS FOR TABLE `frm_Forums`:
--   `last_post`
--       `frm_Posts` -> `pid`
--   `category`
--       `frm_Categories` -> `id`
--

--
-- Dumping data for table `frm_Forums`
--

INSERT INTO `frm_Forums` (`fid`, `category`, `name`, `description`, `last_post`, `view_mod_level_min`, `post_mod_level_min`, `view_charter_level_min`, `post_charter_level_min`, `hidden`) VALUES
(1, 1, 'News', '', NULL, 0, 4, 0, 0, 0),
(2, 1, 'Suggestions', '', NULL, 0, 0, 0, 0, 0),
(3, 1, 'Routine Postings', '', NULL, 0, 3, 0, 0, 0),
(4, 1, 'Development', '', NULL, 0, 3, 0, 0, 0),
(5, 1, 'Introductions', '', NULL, 0, 0, 0, 0, 0),
(6, 2, 'General', '', NULL, 0, 0, 0, 0, 0),
(7, 2, 'Questions & Answers', '', NULL, 0, 0, 0, 0, 0),
(8, 2, 'Tutorials and Guides', '', NULL, 0, 0, 0, 0, 0),
(9, 2, 'Charter''s Chat', '', NULL, 0, 0, 0, 0, 0),
(10, 2, 'Musician''s Chat', '', NULL, 0, 0, 0, 0, 0),
(11, 2, 'Mod''s Chat', '', NULL, 2, 2, 0, 0, 0),
(12, 2, 'Request Forum', '', NULL, 0, 0, 0, 0, 0),
(13, 2, 'Song Comments', '', NULL, 0, 4, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `frm_Posts`
--

DROP TABLE IF EXISTS `frm_Posts`;
CREATE TABLE IF NOT EXISTS `frm_Posts` (
  `pid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tid` int(11) unsigned NOT NULL COMMENT 'Topic ID',
  `text` mediumtext NOT NULL,
  `owner` int(11) unsigned DEFAULT NULL COMMENT 'User ID of owner',
  `date_posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `editor` int(11) unsigned DEFAULT NULL COMMENT 'User ID of editor',
  `edit_note` varchar(255) DEFAULT NULL,
  `date_edited` timestamp NULL DEFAULT NULL,
  `rating` tinyint(4) NOT NULL DEFAULT '0' COMMENT 'Min -100, Max +100',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pid`),
  KEY `tid` (`tid`),
  KEY `owner` (`owner`),
  KEY `editor` (`editor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- RELATIONS FOR TABLE `frm_Posts`:
--   `tid`
--       `frm_Topics` -> `tid`
--   `owner`
--       `Users` -> `uid`
--   `editor`
--       `Users` -> `uid`
--

-- --------------------------------------------------------

--
-- Table structure for table `frm_Topics`
--

DROP TABLE IF EXISTS `frm_Topics`;
CREATE TABLE IF NOT EXISTS `frm_Topics` (
  `tid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fid` int(11) unsigned NOT NULL COMMENT 'Forum ID',
  `title` varchar(255) NOT NULL,
  `owner` int(11) unsigned DEFAULT NULL COMMENT 'User ID of owner',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `stickied` tinyint(1) NOT NULL DEFAULT '0',
  `views` int(11) NOT NULL DEFAULT '0',
  `replies` int(11) NOT NULL DEFAULT '0',
  `date_posted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_replied` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `moved_from` int(11) unsigned DEFAULT NULL COMMENT 'Forum ID moved from',
  `moved_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `fid` (`fid`),
  KEY `owner` (`owner`),
  KEY `moved_from` (`moved_from`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- RELATIONS FOR TABLE `frm_Topics`:
--   `fid`
--       `frm_Forums` -> `fid`
--   `moved_from`
--       `frm_Forums` -> `fid`
--   `owner`
--       `Users` -> `uid`
--

-- --------------------------------------------------------

--
-- Table structure for table `Genres`
--

DROP TABLE IF EXISTS `Genres`;
CREATE TABLE IF NOT EXISTS `Genres` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=29 ;

--
-- Dumping data for table `Genres`
--

INSERT INTO `Genres` (`id`, `name`) VALUES
(1, 'Alternative'),
(2, 'Anime'),
(3, 'Blues'),
(4, 'Classical'),
(5, 'Country'),
(6, 'Dance'),
(7, 'Easy Listening'),
(8, 'Electronic'),
(9, 'Enka'),
(10, 'Hip-Hop/Rap'),
(11, 'Holiday'),
(12, 'Indie Pop'),
(13, 'Industrial'),
(14, 'Instrumental'),
(15, 'Jazz'),
(16, 'J-Pop'),
(17, 'Karaoke'),
(18, 'K-Pop'),
(19, 'Latino'),
(20, 'New Age'),
(21, 'Opera'),
(22, 'Pop'),
(23, 'R&B/Soul'),
(24, 'Reggae'),
(25, 'Rock'),
(26, 'Soundtrack'),
(27, 'Vocal'),
(28, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `Groups`
--

DROP TABLE IF EXISTS `Groups`;
CREATE TABLE IF NOT EXISTS `Groups` (
  `gid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `date_formed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Songs`
--

DROP TABLE IF EXISTS `Songs`;
CREATE TABLE IF NOT EXISTS `Songs` (
  `sid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner` int(10) unsigned DEFAULT NULL COMMENT 'User ID of song owner',
  `artist` int(10) unsigned DEFAULT NULL COMMENT 'Artist ID of song artist',
  `name` text NOT NULL,
  `description` mediumtext NOT NULL,
  `url` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `genres` bit(32) NOT NULL COMMENT 'Bit map representing genre of song',
  `topic_id` int(11) unsigned NOT NULL COMMENT 'Song Comments Topic ID',
  `rating_mod_score_total` int(10) unsigned NOT NULL,
  `rating_mod_difficulty_total` int(10) unsigned NOT NULL,
  `rating_mod_count` int(10) unsigned NOT NULL,
  `rating_mod_score` decimal(5,3) NOT NULL,
  `rating_mod_difficulty` decimal(5,3) NOT NULL,
  `rating_user_score_total` int(10) unsigned NOT NULL,
  `rating_user_difficulty_total` int(10) unsigned NOT NULL,
  `rating_user_count` int(10) unsigned NOT NULL,
  `rating_user_score` decimal(5,3) NOT NULL,
  `rating_user_difficulty` decimal(5,3) NOT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sid`),
  KEY `owner` (`owner`),
  KEY `artist` (`artist`),
  KEY `topic_id` (`topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- RELATIONS FOR TABLE `Songs`:
--   `topic_id`
--       `frm_Posts` -> `tid`
--   `artist`
--       `Artists` -> `id`
--   `owner`
--       `Users` -> `uid`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `name` varchar(32) NOT NULL,
  `tier` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `group_id` int(10) unsigned DEFAULT NULL,
  `points` bigint(20) unsigned NOT NULL DEFAULT '0',
  `experience` bigint(20) unsigned NOT NULL DEFAULT '0',
  `mod_level` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `mod_reputation` smallint(5) unsigned NOT NULL DEFAULT '0',
  `mod_rating` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'Min -20, Max +10',
  `mod_points` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT 'Points to give to other people',
  `charter_level` tinyint(3) unsigned NOT NULL DEFAULT '1',
  `ban_level` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ban_until` timestamp NULL DEFAULT NULL,
  `date_join` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- RELATIONS FOR TABLE `Users`:
--   `group_id`
--       `Groups` -> `gid`
--

--
-- Constraints for dumped tables
--

--
-- Constraints for table `frm_Forums`
--
ALTER TABLE `frm_Forums`
  ADD CONSTRAINT `frm_Forums_ibfk_2` FOREIGN KEY (`last_post`) REFERENCES `frm_Posts` (`pid`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `frm_Forums_ibfk_1` FOREIGN KEY (`category`) REFERENCES `frm_Categories` (`id`);

--
-- Constraints for table `frm_Posts`
--
ALTER TABLE `frm_Posts`
  ADD CONSTRAINT `frm_Posts_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `frm_Topics` (`tid`) ON DELETE CASCADE,
  ADD CONSTRAINT `frm_Posts_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `Users` (`uid`) ON DELETE SET NULL,
  ADD CONSTRAINT `frm_Posts_ibfk_5` FOREIGN KEY (`editor`) REFERENCES `Users` (`uid`) ON DELETE SET NULL;

--
-- Constraints for table `frm_Topics`
--
ALTER TABLE `frm_Topics`
  ADD CONSTRAINT `frm_Topics_ibfk_1` FOREIGN KEY (`fid`) REFERENCES `frm_Forums` (`fid`),
  ADD CONSTRAINT `frm_Topics_ibfk_2` FOREIGN KEY (`moved_from`) REFERENCES `frm_Forums` (`fid`),
  ADD CONSTRAINT `frm_Topics_ibfk_4` FOREIGN KEY (`owner`) REFERENCES `Users` (`uid`) ON DELETE SET NULL;

--
-- Constraints for table `Songs`
--
ALTER TABLE `Songs`
  ADD CONSTRAINT `Songs_ibfk_3` FOREIGN KEY (`topic_id`) REFERENCES `frm_Posts` (`tid`),
  ADD CONSTRAINT `Songs_ibfk_1` FOREIGN KEY (`artist`) REFERENCES `Artists` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `Songs_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `Users` (`uid`) ON DELETE SET NULL;

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `Groups` (`gid`) ON DELETE SET NULL;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
