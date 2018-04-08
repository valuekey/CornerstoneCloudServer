package com.delta.cornerstone.cloud.server.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.delta.cornerstone.cloud.server.domain.CloudMeuConfiguration;

import com.delta.cornerstone.cloud.server.repository.CloudMeuConfigurationRepository;
import com.delta.cornerstone.cloud.server.web.rest.errors.BadRequestAlertException;
import com.delta.cornerstone.cloud.server.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CloudMeuConfiguration.
 */
@RestController
@RequestMapping("/api")
public class CloudMeuConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(CloudMeuConfigurationResource.class);

    private static final String ENTITY_NAME = "cloudMeuConfiguration";

    private final CloudMeuConfigurationRepository cloudMeuConfigurationRepository;

    public CloudMeuConfigurationResource(CloudMeuConfigurationRepository cloudMeuConfigurationRepository) {
        this.cloudMeuConfigurationRepository = cloudMeuConfigurationRepository;
    }

    /**
     * POST  /cloud-meu-configurations : Create a new cloudMeuConfiguration.
     *
     * @param cloudMeuConfiguration the cloudMeuConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cloudMeuConfiguration, or with status 400 (Bad Request) if the cloudMeuConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cloud-meu-configurations")
    @Timed
    public ResponseEntity<CloudMeuConfiguration> createCloudMeuConfiguration(@Valid @RequestBody CloudMeuConfiguration cloudMeuConfiguration) throws URISyntaxException {
        log.debug("REST request to save CloudMeuConfiguration : {}", cloudMeuConfiguration);
        if (cloudMeuConfiguration.getId() != null) {
            throw new BadRequestAlertException("A new cloudMeuConfiguration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CloudMeuConfiguration result = cloudMeuConfigurationRepository.save(cloudMeuConfiguration);
        return ResponseEntity.created(new URI("/api/cloud-meu-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cloud-meu-configurations : Updates an existing cloudMeuConfiguration.
     *
     * @param cloudMeuConfiguration the cloudMeuConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cloudMeuConfiguration,
     * or with status 400 (Bad Request) if the cloudMeuConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the cloudMeuConfiguration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cloud-meu-configurations")
    @Timed
    public ResponseEntity<CloudMeuConfiguration> updateCloudMeuConfiguration(@Valid @RequestBody CloudMeuConfiguration cloudMeuConfiguration) throws URISyntaxException {
        log.debug("REST request to update CloudMeuConfiguration : {}", cloudMeuConfiguration);
        if (cloudMeuConfiguration.getId() == null) {
            return createCloudMeuConfiguration(cloudMeuConfiguration);
        }
        CloudMeuConfiguration result = cloudMeuConfigurationRepository.save(cloudMeuConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cloudMeuConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cloud-meu-configurations : get all the cloudMeuConfigurations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cloudMeuConfigurations in body
     */
    @GetMapping("/cloud-meu-configurations")
    @Timed
    public List<CloudMeuConfiguration> getAllCloudMeuConfigurations() {
        log.debug("REST request to get all CloudMeuConfigurations");
        return cloudMeuConfigurationRepository.findAll();
        }

    /**
     * GET  /cloud-meu-configurations/:id : get the "id" cloudMeuConfiguration.
     *
     * @param id the id of the cloudMeuConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cloudMeuConfiguration, or with status 404 (Not Found)
     */
    @GetMapping("/cloud-meu-configurations/{id}")
    @Timed
    public ResponseEntity<CloudMeuConfiguration> getCloudMeuConfiguration(@PathVariable Long id) {
        log.debug("REST request to get CloudMeuConfiguration : {}", id);
        CloudMeuConfiguration cloudMeuConfiguration = cloudMeuConfigurationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cloudMeuConfiguration));
    }

    /**
     * DELETE  /cloud-meu-configurations/:id : delete the "id" cloudMeuConfiguration.
     *
     * @param id the id of the cloudMeuConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cloud-meu-configurations/{id}")
    @Timed
    public ResponseEntity<Void> deleteCloudMeuConfiguration(@PathVariable Long id) {
        log.debug("REST request to delete CloudMeuConfiguration : {}", id);
        cloudMeuConfigurationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
