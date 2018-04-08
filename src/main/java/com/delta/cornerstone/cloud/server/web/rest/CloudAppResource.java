package com.delta.cornerstone.cloud.server.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.delta.cornerstone.cloud.server.domain.CloudApp;

import com.delta.cornerstone.cloud.server.repository.CloudAppRepository;
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
 * REST controller for managing CloudApp.
 */
@RestController
@RequestMapping("/api")
public class CloudAppResource {

    private final Logger log = LoggerFactory.getLogger(CloudAppResource.class);

    private static final String ENTITY_NAME = "cloudApp";

    private final CloudAppRepository cloudAppRepository;

    public CloudAppResource(CloudAppRepository cloudAppRepository) {
        this.cloudAppRepository = cloudAppRepository;
    }

    /**
     * POST  /cloud-apps : Create a new cloudApp.
     *
     * @param cloudApp the cloudApp to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cloudApp, or with status 400 (Bad Request) if the cloudApp has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cloud-apps")
    @Timed
    public ResponseEntity<CloudApp> createCloudApp(@Valid @RequestBody CloudApp cloudApp) throws URISyntaxException {
        log.debug("REST request to save CloudApp : {}", cloudApp);
        if (cloudApp.getId() != null) {
            throw new BadRequestAlertException("A new cloudApp cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CloudApp result = cloudAppRepository.save(cloudApp);
        return ResponseEntity.created(new URI("/api/cloud-apps/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cloud-apps : Updates an existing cloudApp.
     *
     * @param cloudApp the cloudApp to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cloudApp,
     * or with status 400 (Bad Request) if the cloudApp is not valid,
     * or with status 500 (Internal Server Error) if the cloudApp couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cloud-apps")
    @Timed
    public ResponseEntity<CloudApp> updateCloudApp(@Valid @RequestBody CloudApp cloudApp) throws URISyntaxException {
        log.debug("REST request to update CloudApp : {}", cloudApp);
        if (cloudApp.getId() == null) {
            return createCloudApp(cloudApp);
        }
        CloudApp result = cloudAppRepository.save(cloudApp);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cloudApp.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cloud-apps : get all the cloudApps.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cloudApps in body
     */
    @GetMapping("/cloud-apps")
    @Timed
    public List<CloudApp> getAllCloudApps() {
        log.debug("REST request to get all CloudApps");
        return cloudAppRepository.findAll();
        }

    /**
     * GET  /cloud-apps/:id : get the "id" cloudApp.
     *
     * @param id the id of the cloudApp to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cloudApp, or with status 404 (Not Found)
     */
    @GetMapping("/cloud-apps/{id}")
    @Timed
    public ResponseEntity<CloudApp> getCloudApp(@PathVariable Long id) {
        log.debug("REST request to get CloudApp : {}", id);
        CloudApp cloudApp = cloudAppRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cloudApp));
    }

    /**
     * DELETE  /cloud-apps/:id : delete the "id" cloudApp.
     *
     * @param id the id of the cloudApp to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cloud-apps/{id}")
    @Timed
    public ResponseEntity<Void> deleteCloudApp(@PathVariable Long id) {
        log.debug("REST request to delete CloudApp : {}", id);
        cloudAppRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
