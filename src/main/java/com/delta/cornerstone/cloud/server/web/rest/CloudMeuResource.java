package com.delta.cornerstone.cloud.server.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.delta.cornerstone.cloud.server.domain.CloudMeu;

import com.delta.cornerstone.cloud.server.repository.CloudMeuRepository;
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
 * REST controller for managing CloudMeu.
 */
@RestController
@RequestMapping("/api")
public class CloudMeuResource {

    private final Logger log = LoggerFactory.getLogger(CloudMeuResource.class);

    private static final String ENTITY_NAME = "cloudMeu";

    private final CloudMeuRepository cloudMeuRepository;

    public CloudMeuResource(CloudMeuRepository cloudMeuRepository) {
        this.cloudMeuRepository = cloudMeuRepository;
    }

    /**
     * POST  /cloud-meus : Create a new cloudMeu.
     *
     * @param cloudMeu the cloudMeu to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cloudMeu, or with status 400 (Bad Request) if the cloudMeu has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cloud-meus")
    @Timed
    public ResponseEntity<CloudMeu> createCloudMeu(@Valid @RequestBody CloudMeu cloudMeu) throws URISyntaxException {
        log.debug("REST request to save CloudMeu : {}", cloudMeu);
        if (cloudMeu.getId() != null) {
            throw new BadRequestAlertException("A new cloudMeu cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CloudMeu result = cloudMeuRepository.save(cloudMeu);
        return ResponseEntity.created(new URI("/api/cloud-meus/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cloud-meus : Updates an existing cloudMeu.
     *
     * @param cloudMeu the cloudMeu to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cloudMeu,
     * or with status 400 (Bad Request) if the cloudMeu is not valid,
     * or with status 500 (Internal Server Error) if the cloudMeu couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cloud-meus")
    @Timed
    public ResponseEntity<CloudMeu> updateCloudMeu(@Valid @RequestBody CloudMeu cloudMeu) throws URISyntaxException {
        log.debug("REST request to update CloudMeu : {}", cloudMeu);
        if (cloudMeu.getId() == null) {
            return createCloudMeu(cloudMeu);
        }
        CloudMeu result = cloudMeuRepository.save(cloudMeu);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cloudMeu.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cloud-meus : get all the cloudMeus.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cloudMeus in body
     */
    @GetMapping("/cloud-meus")
    @Timed
    public List<CloudMeu> getAllCloudMeus() {
        log.debug("REST request to get all CloudMeus");
        return cloudMeuRepository.findAll();
        }

    /**
     * GET  /cloud-meus/:id : get the "id" cloudMeu.
     *
     * @param id the id of the cloudMeu to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cloudMeu, or with status 404 (Not Found)
     */
    @GetMapping("/cloud-meus/{id}")
    @Timed
    public ResponseEntity<CloudMeu> getCloudMeu(@PathVariable Long id) {
        log.debug("REST request to get CloudMeu : {}", id);
        CloudMeu cloudMeu = cloudMeuRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cloudMeu));
    }

    /**
     * DELETE  /cloud-meus/:id : delete the "id" cloudMeu.
     *
     * @param id the id of the cloudMeu to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cloud-meus/{id}")
    @Timed
    public ResponseEntity<Void> deleteCloudMeu(@PathVariable Long id) {
        log.debug("REST request to delete CloudMeu : {}", id);
        cloudMeuRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
