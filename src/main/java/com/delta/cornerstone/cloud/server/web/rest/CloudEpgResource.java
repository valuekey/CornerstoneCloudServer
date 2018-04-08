package com.delta.cornerstone.cloud.server.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.delta.cornerstone.cloud.server.domain.CloudEpg;

import com.delta.cornerstone.cloud.server.repository.CloudEpgRepository;
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
 * REST controller for managing CloudEpg.
 */
@RestController
@RequestMapping("/api")
public class CloudEpgResource {

    private final Logger log = LoggerFactory.getLogger(CloudEpgResource.class);

    private static final String ENTITY_NAME = "cloudEpg";

    private final CloudEpgRepository cloudEpgRepository;

    public CloudEpgResource(CloudEpgRepository cloudEpgRepository) {
        this.cloudEpgRepository = cloudEpgRepository;
    }

    /**
     * POST  /cloud-epgs : Create a new cloudEpg.
     *
     * @param cloudEpg the cloudEpg to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cloudEpg, or with status 400 (Bad Request) if the cloudEpg has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cloud-epgs")
    @Timed
    public ResponseEntity<CloudEpg> createCloudEpg(@Valid @RequestBody CloudEpg cloudEpg) throws URISyntaxException {
        log.debug("REST request to save CloudEpg : {}", cloudEpg);
        if (cloudEpg.getId() != null) {
            throw new BadRequestAlertException("A new cloudEpg cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CloudEpg result = cloudEpgRepository.save(cloudEpg);
        return ResponseEntity.created(new URI("/api/cloud-epgs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cloud-epgs : Updates an existing cloudEpg.
     *
     * @param cloudEpg the cloudEpg to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cloudEpg,
     * or with status 400 (Bad Request) if the cloudEpg is not valid,
     * or with status 500 (Internal Server Error) if the cloudEpg couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cloud-epgs")
    @Timed
    public ResponseEntity<CloudEpg> updateCloudEpg(@Valid @RequestBody CloudEpg cloudEpg) throws URISyntaxException {
        log.debug("REST request to update CloudEpg : {}", cloudEpg);
        if (cloudEpg.getId() == null) {
            return createCloudEpg(cloudEpg);
        }
        CloudEpg result = cloudEpgRepository.save(cloudEpg);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cloudEpg.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cloud-epgs : get all the cloudEpgs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cloudEpgs in body
     */
    @GetMapping("/cloud-epgs")
    @Timed
    public List<CloudEpg> getAllCloudEpgs() {
        log.debug("REST request to get all CloudEpgs");
        return cloudEpgRepository.findAll();
        }

    /**
     * GET  /cloud-epgs/:id : get the "id" cloudEpg.
     *
     * @param id the id of the cloudEpg to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cloudEpg, or with status 404 (Not Found)
     */
    @GetMapping("/cloud-epgs/{id}")
    @Timed
    public ResponseEntity<CloudEpg> getCloudEpg(@PathVariable Long id) {
        log.debug("REST request to get CloudEpg : {}", id);
        CloudEpg cloudEpg = cloudEpgRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cloudEpg));
    }

    /**
     * DELETE  /cloud-epgs/:id : delete the "id" cloudEpg.
     *
     * @param id the id of the cloudEpg to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cloud-epgs/{id}")
    @Timed
    public ResponseEntity<Void> deleteCloudEpg(@PathVariable Long id) {
        log.debug("REST request to delete CloudEpg : {}", id);
        cloudEpgRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
