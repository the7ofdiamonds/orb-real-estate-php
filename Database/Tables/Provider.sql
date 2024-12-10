CREATE TABLE `provider` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `user_id` bigint COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `name` bigint DEFAULT NULL,
  `logo` bigint DEFAULT NULL,
  `services` text DEFAULT NULL,
  `images` text DEFAULT NULL,
  `real_estate_listing_ids` text DEFAULT NULL,
  `updated` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;