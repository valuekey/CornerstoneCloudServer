package com.delta.cornerstone.cloud.server.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.delta.cornerstone.cloud.server.domain.CloudMeuZip;

import com.delta.cornerstone.cloud.server.repository.CloudMeuZipRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing CloudMeuZip.
 */
@RestController
@RequestMapping("/api")
public class CloudMeuZipResource {

    private final Logger log = LoggerFactory.getLogger(CloudMeuZipResource.class);

    private static final String ENTITY_NAME = "cloudMeuZip";

    private final CloudMeuZipRepository cloudMeuZipRepository;

    public CloudMeuZipResource(CloudMeuZipRepository cloudMeuZipRepository) {
        this.cloudMeuZipRepository = cloudMeuZipRepository;
    }

    /**
     * POST  /cloud-meu-zips : Create a new cloudMeuZip.
     *
     * @param cloudMeuZip the cloudMeuZip to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cloudMeuZip, or with status 400 (Bad Request) if the cloudMeuZip has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cloud-meu-zips")
    @Timed
    public ResponseEntity<CloudMeuZip> createCloudMeuZip(@Valid @RequestBody CloudMeuZip cloudMeuZip) throws URISyntaxException {
        log.debug("REST request to save CloudMeuZip : {}", cloudMeuZip);
        if (cloudMeuZip.getId() != null) {
            throw new BadRequestAlertException("A new cloudMeuZip cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CloudMeuZip result = cloudMeuZipRepository.save(cloudMeuZip);
        return ResponseEntity.created(new URI("/api/cloud-meu-zips/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cloud-meu-zips : Updates an existing cloudMeuZip.
     *
     * @param cloudMeuZip the cloudMeuZip to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cloudMeuZip,
     * or with status 400 (Bad Request) if the cloudMeuZip is not valid,
     * or with status 500 (Internal Server Error) if the cloudMeuZip couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cloud-meu-zips")
    @Timed
    public ResponseEntity<CloudMeuZip> updateCloudMeuZip(@Valid @RequestBody CloudMeuZip cloudMeuZip) throws URISyntaxException {
        log.debug("REST request to update CloudMeuZip : {}", cloudMeuZip);
        if (cloudMeuZip.getId() == null) {
            return createCloudMeuZip(cloudMeuZip);
        }
        CloudMeuZip result = cloudMeuZipRepository.save(cloudMeuZip);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cloudMeuZip.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cloud-meu-zips : get all the cloudMeuZips.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of cloudMeuZips in body
     */
    @GetMapping("/cloud-meu-zips")
    @Timed
    public List<CloudMeuZip> getAllCloudMeuZips(@RequestParam(required = false) String filter) {
        if ("cloudmeu-is-null".equals(filter)) {
            log.debug("REST request to get all CloudMeuZips where cloudMeu is null");
            return StreamSupport
                .stream(cloudMeuZipRepository.findAll().spliterator(), false)
                .filter(cloudMeuZip -> cloudMeuZip.getCloudMeu() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all CloudMeuZips");
        return cloudMeuZipRepository.findAll();
        }

    /**
     * GET  /cloud-meu-zips/:id : get the "id" cloudMeuZip.
     *
     * @param id the id of the cloudMeuZip to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cloudMeuZip, or with status 404 (Not Found)
     */
    @GetMapping("/cloud-meu-zips/{id}")
    @Timed
    public ResponseEntity<CloudMeuZip> getCloudMeuZip(@PathVariable Long id) {
        log.debug("REST request to get CloudMeuZip : {}", id);
        CloudMeuZip cloudMeuZip = cloudMeuZipRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cloudMeuZip));
    }

    /**
     * DELETE  /cloud-meu-zips/:id : delete the "id" cloudMeuZip.
     *
     * @param id the id of the cloudMeuZip to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cloud-meu-zips/{id}")
    @Timed
    public ResponseEntity<Void> deleteCloudMeuZip(@PathVariable Long id) {
        log.debug("REST request to delete CloudMeuZip : {}", id);
        cloudMeuZipRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
