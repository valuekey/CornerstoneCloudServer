package com.delta.cornerstone.cloud.server.repository;

import com.delta.cornerstone.cloud.server.domain.CloudMeu;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the CloudMeu entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CloudMeuRepository extends JpaRepository<CloudMeu, Long> {

}
