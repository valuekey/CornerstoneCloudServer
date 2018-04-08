package com.delta.cornerstone.cloud.server.web.rest;

import com.delta.cornerstone.cloud.server.CornerstoneCloudServerApp;

import com.delta.cornerstone.cloud.server.domain.CloudEpg;
import com.delta.cornerstone.cloud.server.repository.CloudEpgRepository;
import com.delta.cornerstone.cloud.server.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.delta.cornerstone.cloud.server.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CloudEpgResource REST controller.
 *
 * @see CloudEpgResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CornerstoneCloudServerApp.class)
public class CloudEpgResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_EPG_DEFINITION = "AAAAAAAAAA";
    private static final String UPDATED_EPG_DEFINITION = "BBBBBBBBBB";

    private static final String DEFAULT_ACCOUNT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL_MAPPINGS = "AAAAAAAAAA";
    private static final String UPDATED_URL_MAPPINGS = "BBBBBBBBBB";

    private static final String DEFAULT_GRAPH_INFO = "AAAAAAAAAA";
    private static final String UPDATED_GRAPH_INFO = "BBBBBBBBBB";

    @Autowired
    private CloudEpgRepository cloudEpgRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCloudEpgMockMvc;

    private CloudEpg cloudEpg;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CloudEpgResource cloudEpgResource = new CloudEpgResource(cloudEpgRepository);
        this.restCloudEpgMockMvc = MockMvcBuilders.standaloneSetup(cloudEpgResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CloudEpg createEntity(EntityManager em) {
        CloudEpg cloudEpg = new CloudEpg()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .epgDefinition(DEFAULT_EPG_DEFINITION)
            .accountName(DEFAULT_ACCOUNT_NAME)
            .urlMappings(DEFAULT_URL_MAPPINGS)
            .graphInfo(DEFAULT_GRAPH_INFO);
        return cloudEpg;
    }

    @Before
    public void initTest() {
        cloudEpg = createEntity(em);
    }

    @Test
    @Transactional
    public void createCloudEpg() throws Exception {
        int databaseSizeBeforeCreate = cloudEpgRepository.findAll().size();

        // Create the CloudEpg
        restCloudEpgMockMvc.perform(post("/api/cloud-epgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudEpg)))
            .andExpect(status().isCreated());

        // Validate the CloudEpg in the database
        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeCreate + 1);
        CloudEpg testCloudEpg = cloudEpgList.get(cloudEpgList.size() - 1);
        assertThat(testCloudEpg.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCloudEpg.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCloudEpg.getEpgDefinition()).isEqualTo(DEFAULT_EPG_DEFINITION);
        assertThat(testCloudEpg.getAccountName()).isEqualTo(DEFAULT_ACCOUNT_NAME);
        assertThat(testCloudEpg.getUrlMappings()).isEqualTo(DEFAULT_URL_MAPPINGS);
        assertThat(testCloudEpg.getGraphInfo()).isEqualTo(DEFAULT_GRAPH_INFO);
    }

    @Test
    @Transactional
    public void createCloudEpgWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cloudEpgRepository.findAll().size();

        // Create the CloudEpg with an existing ID
        cloudEpg.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCloudEpgMockMvc.perform(post("/api/cloud-epgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudEpg)))
            .andExpect(status().isBadRequest());

        // Validate the CloudEpg in the database
        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudEpgRepository.findAll().size();
        // set the field null
        cloudEpg.setName(null);

        // Create the CloudEpg, which fails.

        restCloudEpgMockMvc.perform(post("/api/cloud-epgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudEpg)))
            .andExpect(status().isBadRequest());

        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccountNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudEpgRepository.findAll().size();
        // set the field null
        cloudEpg.setAccountName(null);

        // Create the CloudEpg, which fails.

        restCloudEpgMockMvc.perform(post("/api/cloud-epgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudEpg)))
            .andExpect(status().isBadRequest());

        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCloudEpgs() throws Exception {
        // Initialize the database
        cloudEpgRepository.saveAndFlush(cloudEpg);

        // Get all the cloudEpgList
        restCloudEpgMockMvc.perform(get("/api/cloud-epgs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cloudEpg.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].epgDefinition").value(hasItem(DEFAULT_EPG_DEFINITION.toString())))
            .andExpect(jsonPath("$.[*].accountName").value(hasItem(DEFAULT_ACCOUNT_NAME.toString())))
            .andExpect(jsonPath("$.[*].urlMappings").value(hasItem(DEFAULT_URL_MAPPINGS.toString())))
            .andExpect(jsonPath("$.[*].graphInfo").value(hasItem(DEFAULT_GRAPH_INFO.toString())));
    }

    @Test
    @Transactional
    public void getCloudEpg() throws Exception {
        // Initialize the database
        cloudEpgRepository.saveAndFlush(cloudEpg);

        // Get the cloudEpg
        restCloudEpgMockMvc.perform(get("/api/cloud-epgs/{id}", cloudEpg.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cloudEpg.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.epgDefinition").value(DEFAULT_EPG_DEFINITION.toString()))
            .andExpect(jsonPath("$.accountName").value(DEFAULT_ACCOUNT_NAME.toString()))
            .andExpect(jsonPath("$.urlMappings").value(DEFAULT_URL_MAPPINGS.toString()))
            .andExpect(jsonPath("$.graphInfo").value(DEFAULT_GRAPH_INFO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCloudEpg() throws Exception {
        // Get the cloudEpg
        restCloudEpgMockMvc.perform(get("/api/cloud-epgs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCloudEpg() throws Exception {
        // Initialize the database
        cloudEpgRepository.saveAndFlush(cloudEpg);
        int databaseSizeBeforeUpdate = cloudEpgRepository.findAll().size();

        // Update the cloudEpg
        CloudEpg updatedCloudEpg = cloudEpgRepository.findOne(cloudEpg.getId());
        // Disconnect from session so that the updates on updatedCloudEpg are not directly saved in db
        em.detach(updatedCloudEpg);
        updatedCloudEpg
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .epgDefinition(UPDATED_EPG_DEFINITION)
            .accountName(UPDATED_ACCOUNT_NAME)
            .urlMappings(UPDATED_URL_MAPPINGS)
            .graphInfo(UPDATED_GRAPH_INFO);

        restCloudEpgMockMvc.perform(put("/api/cloud-epgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCloudEpg)))
            .andExpect(status().isOk());

        // Validate the CloudEpg in the database
        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeUpdate);
        CloudEpg testCloudEpg = cloudEpgList.get(cloudEpgList.size() - 1);
        assertThat(testCloudEpg.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCloudEpg.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCloudEpg.getEpgDefinition()).isEqualTo(UPDATED_EPG_DEFINITION);
        assertThat(testCloudEpg.getAccountName()).isEqualTo(UPDATED_ACCOUNT_NAME);
        assertThat(testCloudEpg.getUrlMappings()).isEqualTo(UPDATED_URL_MAPPINGS);
        assertThat(testCloudEpg.getGraphInfo()).isEqualTo(UPDATED_GRAPH_INFO);
    }

    @Test
    @Transactional
    public void updateNonExistingCloudEpg() throws Exception {
        int databaseSizeBeforeUpdate = cloudEpgRepository.findAll().size();

        // Create the CloudEpg

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCloudEpgMockMvc.perform(put("/api/cloud-epgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudEpg)))
            .andExpect(status().isCreated());

        // Validate the CloudEpg in the database
        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCloudEpg() throws Exception {
        // Initialize the database
        cloudEpgRepository.saveAndFlush(cloudEpg);
        int databaseSizeBeforeDelete = cloudEpgRepository.findAll().size();

        // Get the cloudEpg
        restCloudEpgMockMvc.perform(delete("/api/cloud-epgs/{id}", cloudEpg.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CloudEpg> cloudEpgList = cloudEpgRepository.findAll();
        assertThat(cloudEpgList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CloudEpg.class);
        CloudEpg cloudEpg1 = new CloudEpg();
        cloudEpg1.setId(1L);
        CloudEpg cloudEpg2 = new CloudEpg();
        cloudEpg2.setId(cloudEpg1.getId());
        assertThat(cloudEpg1).isEqualTo(cloudEpg2);
        cloudEpg2.setId(2L);
        assertThat(cloudEpg1).isNotEqualTo(cloudEpg2);
        cloudEpg1.setId(null);
        assertThat(cloudEpg1).isNotEqualTo(cloudEpg2);
    }
}
