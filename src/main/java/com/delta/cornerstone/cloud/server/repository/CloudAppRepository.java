package com.delta.cornerstone.cloud.server.repository;

import com.delta.cornerstone.cloud.server.domain.CloudApp;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CloudApp entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CloudAppRepository extends JpaRepository<CloudApp, Long> {

}
