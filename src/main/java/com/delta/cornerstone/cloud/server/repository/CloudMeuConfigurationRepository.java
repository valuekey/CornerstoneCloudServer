package com.delta.cornerstone.cloud.server.repository;

import com.delta.cornerstone.cloud.server.domain.CloudMeuConfiguration;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CloudMeuConfiguration entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CloudMeuConfigurationRepository extends JpaRepository<CloudMeuConfiguration, Long> {

}
