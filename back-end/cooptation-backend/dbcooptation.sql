-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 17 août 2022 à 18:06
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dbcooptation`
--

-- --------------------------------------------------------

--
-- Structure de la table `cooptation`
--

CREATE TABLE `cooptation` (
  `id` int(11) NOT NULL,
  `status_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `coopted_entity_id` int(11) DEFAULT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cv` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `civility` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` int(11) NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `professional_experience` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application_date` date NOT NULL,
  `current_position` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_experience_date` date NOT NULL,
  `fields_activity` tinyint(1) NOT NULL,
  `current_salary` tinyint(1) NOT NULL,
  `key_figures` tinyint(1) NOT NULL,
  `interview_date` date NOT NULL,
  `interview_type` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `geographical_wishes` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `comments` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `personality` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `skils` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `experience` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `desired_salary` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cooptation`
--

INSERT INTO `cooptation` (`id`, `status_id`, `user_id`, `coopted_entity_id`, `firstname`, `lastname`, `cv`, `civility`, `phone`, `link`, `email`, `professional_experience`, `application_date`, `current_position`, `first_experience_date`, `fields_activity`, `current_salary`, `key_figures`, `interview_date`, `interview_type`, `geographical_wishes`, `comments`, `personality`, `skils`, `experience`, `desired_salary`, `salary`) VALUES
(32, 1, 4, 1, 'emna', 'ghariani', 'CV EMNA GHARIANI-62fd11abe9ce2.pdf', 'Femme', 20200200, 'professionnel', 'habib@talan.com', 'ecperience...', '2022-08-17', 'web-dev', '2022-08-17', 1, 1, 1, '2020-01-20', 'a:1:{i:0;s:3:\"[1]\";}', 'a:1:{i:0;N;}', 'comments', 'personality', '', 'experience', 'a:1:{i:0;s:14:\"desired_salary\";}', 0),
(33, 1, 3, 1, 'emna', 'ghariani', 'CV EMNA GHARIANI-62fd11cdbe1e0.pdf', 'Femme', 20200200, 'professionnel', 'habib@talan.com', 'ecperience...', '2022-08-17', 'web-dev', '2022-08-17', 1, 1, 1, '2020-01-20', 'a:1:{i:0;s:3:\"[1]\";}', 'a:1:{i:0;N;}', 'comments', 'personality', '', 'experience', 'a:1:{i:0;s:14:\"desired_salary\";}', 0),
(34, 1, 2, 1, 'emna', 'ghariani', 'CV EMNA GHARIANI-62fd11d187a36.pdf', 'Femme', 20200200, 'professionnel', 'habib@talan.com', 'ecperience...', '2022-08-17', 'web-dev', '2022-08-17', 1, 1, 1, '2020-01-20', 'a:1:{i:0;s:3:\"[1]\";}', 'a:1:{i:0;N;}', 'comments', 'personality', '', 'experience', 'a:1:{i:0;s:14:\"desired_salary\";}', 0),
(35, 1, 5, 1, 'emna', 'ghariani', 'CV EMNA GHARIANI-62fd11d7e33d4.pdf', 'Femme', 20200200, 'professionnel', 'habib@talan.com', 'ecperience...', '2022-08-17', 'web-dev', '2022-08-17', 1, 1, 1, '2020-01-20', 'a:1:{i:0;s:3:\"[1]\";}', 'a:1:{i:0;N;}', 'comments', 'personality', '', 'experience', 'a:1:{i:0;s:14:\"desired_salary\";}', 0);

-- --------------------------------------------------------

--
-- Structure de la table `coopted_entity`
--

CREATE TABLE `coopted_entity` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `coopted_entity`
--

INSERT INTO `coopted_entity` (`id`, `name`) VALUES
(1, 'Tunis'),
(2, 'Paris');

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20220817095234', '2022-08-17 11:52:46', 5442),
('DoctrineMigrations\\Version20220817134051', '2022-08-17 15:40:56', 2494);

-- --------------------------------------------------------

--
-- Structure de la table `pole`
--

CREATE TABLE `pole` (
  `id` int(11) NOT NULL,
  `coopted_entity_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `pole`
--

INSERT INTO `pole` (`id`, `coopted_entity_id`, `name`) VALUES
(1, 1, 'php'),
(2, 2, 'php'),
(3, 1, 'JAVA');

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`id`, `name`) VALUES
(1, 'A soumettre');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '(DC2Type:json)',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pole_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `roles`, `password`, `pole_id`) VALUES
(1, 'admin@talan.com', 'admin', '[\"ROLE_ADMIN\"]', '$argon2id$v=19$m=65536,t=4,p=1$Z081YW1uMVVGSi5CWVhMRA$R3Gn8v6H68UY3DFCw6/kEOnUYMBSBkOIDTZXY1vXYUE', 1),
(2, 'habib@talan.com', 'habib', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$dEJNR0k0Mk00Ukh1dGdXYw$Kq+bD2a0B239IzAkNWcEs2egFqRXMLpQ4g7t/RXlvaY', 1),
(3, 'samar@talan.com', 'samar', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$bjRyNGxkN3BtMFdiRkR5Ug$mgh/GV6yJIQf/uttrneOul5M1XrDXGo0kJtGwkepP1A', 1),
(4, 'kenza@talan.com', 'kenza', '[\"ROLE_USER\"]', '$argon2id$v=19$m=65536,t=4,p=1$Q2tzOE1IL0VZcG5oSE9VYw$13O5Gp7RmU2mbt3hsgLzfb0JTinSmUc4W6aDs6v8VCY', 1),
(5, 'rania@talan.com', 'rania', '[\"ROLE_MANAGER\"]', '$argon2id$v=19$m=65536,t=4,p=1$VW8vMlE4a29sSC5jQmc3bg$m4pN7FewQ6PpnEpS1eNqEJP2DJaXLRWjPgYepAsxK/U', 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `cooptation`
--
ALTER TABLE `cooptation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_60F616356BF700BD` (`status_id`),
  ADD KEY `IDX_60F61635A76ED395` (`user_id`),
  ADD KEY `IDX_60F61635A7607E37` (`coopted_entity_id`);

--
-- Index pour la table `coopted_entity`
--
ALTER TABLE `coopted_entity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `pole`
--
ALTER TABLE `pole`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_FD6042E1A7607E37` (`coopted_entity_id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`),
  ADD KEY `IDX_8D93D649419C3385` (`pole_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cooptation`
--
ALTER TABLE `cooptation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT pour la table `coopted_entity`
--
ALTER TABLE `coopted_entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `pole`
--
ALTER TABLE `pole`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cooptation`
--
ALTER TABLE `cooptation`
  ADD CONSTRAINT `FK_60F616356BF700BD` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `FK_60F61635A7607E37` FOREIGN KEY (`coopted_entity_id`) REFERENCES `coopted_entity` (`id`),
  ADD CONSTRAINT `FK_60F61635A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `pole`
--
ALTER TABLE `pole`
  ADD CONSTRAINT `FK_FD6042E1A7607E37` FOREIGN KEY (`coopted_entity_id`) REFERENCES `coopted_entity` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649419C3385` FOREIGN KEY (`pole_id`) REFERENCES `pole` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
