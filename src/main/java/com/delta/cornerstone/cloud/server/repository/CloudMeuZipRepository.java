package com.delta.cornerstone.cloud.server.repository;

import com.delta.cornerstone.cloud.server.domain.CloudMeuZip;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CloudMeuZip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CloudMeuZipRepository extends JpaRepository<CloudMeuZip, Long> {

}
