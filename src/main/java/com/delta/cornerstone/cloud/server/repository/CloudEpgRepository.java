package com.delta.cornerstone.cloud.server.repository;

import com.delta.cornerstone.cloud.server.domain.CloudEpg;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CloudEpg entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CloudEpgRepository extends JpaRepository<CloudEpg, Long> {

}
