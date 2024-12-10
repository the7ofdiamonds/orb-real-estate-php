CREATE TABLE `contributor` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `provider_id` bigint COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `contribution` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `percentage` float COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;