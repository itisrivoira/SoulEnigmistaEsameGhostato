-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Mag 18, 2022 alle 09:45
-- Versione del server: 10.4.14-MariaDB
-- Versione PHP: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Soul`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `Domande`
--

CREATE TABLE `Domande` (
  `domanda` varchar(200) NOT NULL,
  `id` int(11) NOT NULL,
  `a` varchar(50) NOT NULL,
  `b` varchar(50) NOT NULL,
  `c` varchar(50) NOT NULL,
  `d` varchar(50) NOT NULL,
  `corretta` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `Domande`
--

INSERT INTO `Domande` (`domanda`, `id`, `a`, `b`, `c`, `d`, `corretta`) VALUES
('What is the integral of 9x^2', 1, '18x', '81x^2', '18x^2', '3x^3', 'd');

-- --------------------------------------------------------

--
-- Struttura della tabella `Salvataggi`
--

CREATE TABLE `Salvataggi` (
  `id` int(11) NOT NULL,
  `Posizione` varchar(20) NOT NULL,
  `Classe` varchar(20) NOT NULL,
  `acl` int(11) NOT NULL,
  `aga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `Salvataggi`
--

INSERT INTO `Salvataggi` (`id`, `Posizione`, `Classe`, `acl`, `aga`) VALUES
(1, 'banconeChim6', 'schermataChim', 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `Utenti`
--

CREATE TABLE `Utenti` (
  `id` int(11) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `Utenti`
--

INSERT INTO `Utenti` (`id`, `nickname`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struttura della tabella `Zaino1`
--

CREATE TABLE `Zaino1` (
  `id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `Zaino1`
--

INSERT INTO `Zaino1` (`id`) VALUES
('acqua'),
('so3');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `Domande`
--
ALTER TABLE `Domande`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `Salvataggi`
--
ALTER TABLE `Salvataggi`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `Utenti`
--
ALTER TABLE `Utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nickname` (`nickname`);

--
-- Indici per le tabelle `Zaino1`
--
ALTER TABLE `Zaino1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `Domande`
--
ALTER TABLE `Domande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `Utenti`
--
ALTER TABLE `Utenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
