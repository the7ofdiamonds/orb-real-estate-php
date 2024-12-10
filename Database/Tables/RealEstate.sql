CREATE TABLE `real_estate` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `apn_parcel_id` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `property_class` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `property_sub_type` text COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `location_details_id` bigint DEFAULT NULL,
  `sale_details_id` bigint DEFAULT NULL,
  `building_details_ids` text DEFAULT NULL,
  `land_details_id` bigint DEFAULT NULL,
  `images` json DEFAULT NULL,
  `contributors` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;