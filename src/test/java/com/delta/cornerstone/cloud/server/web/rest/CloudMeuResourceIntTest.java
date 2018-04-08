package com.delta.cornerstone.cloud.server.web.rest;

import com.delta.cornerstone.cloud.server.CornerstoneCloudServerApp;

import com.delta.cornerstone.cloud.server.domain.CloudMeu;
import com.delta.cornerstone.cloud.server.repository.CloudMeuRepository;
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
 * Test class for the CloudMeuResource REST controller.
 *
 * @see CloudMeuResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CornerstoneCloudServerApp.class)
public class CloudMeuResourceIntTest {

    private static final String DEFAULT_GROUP_ID = "AAAAAAAAAA";
    private static final String UPDATED_GROUP_ID = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_MEU_DEFINITION = "AAAAAAAAAA";
    private static final String UPDATED_MEU_DEFINITION = "BBBBBBBBBB";

    private static final String DEFAULT_FILE_ID = "AAAAAAAAAA";
    private static final String UPDATED_FILE_ID = "BBBBBBBBBB";

    @Autowired
    private CloudMeuRepository cloudMeuRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCloudMeuMockMvc;

    private CloudMeu cloudMeu;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CloudMeuResource cloudMeuResource = new CloudMeuResource(cloudMeuRepository);
        this.restCloudMeuMockMvc = MockMvcBuilders.standaloneSetup(cloudMeuResource)
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
    public static CloudMeu createEntity(EntityManager em) {
        CloudMeu cloudMeu = new CloudMeu()
            .groupId(DEFAULT_GROUP_ID)
            .name(DEFAULT_NAME)
            .version(DEFAULT_VERSION)
            .type(DEFAULT_TYPE)
            .meuDefinition(DEFAULT_MEU_DEFINITION)
            .fileId(DEFAULT_FILE_ID);
        return cloudMeu;
    }

    @Before
    public void initTest() {
        cloudMeu = createEntity(em);
    }

    @Test
    @Transactional
    public void createCloudMeu() throws Exception {
        int databaseSizeBeforeCreate = cloudMeuRepository.findAll().size();

        // Create the CloudMeu
        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isCreated());

        // Validate the CloudMeu in the database
        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeCreate + 1);
        CloudMeu testCloudMeu = cloudMeuList.get(cloudMeuList.size() - 1);
        assertThat(testCloudMeu.getGroupId()).isEqualTo(DEFAULT_GROUP_ID);
        assertThat(testCloudMeu.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCloudMeu.getVersion()).isEqualTo(DEFAULT_VERSION);
        assertThat(testCloudMeu.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testCloudMeu.getMeuDefinition()).isEqualTo(DEFAULT_MEU_DEFINITION);
        assertThat(testCloudMeu.getFileId()).isEqualTo(DEFAULT_FILE_ID);
    }

    @Test
    @Transactional
    public void createCloudMeuWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cloudMeuRepository.findAll().size();

        // Create the CloudMeu with an existing ID
        cloudMeu.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isBadRequest());

        // Validate the CloudMeu in the database
        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkGroupIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuRepository.findAll().size();
        // set the field null
        cloudMeu.setGroupId(null);

        // Create the CloudMeu, which fails.

        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isBadRequest());

        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuRepository.findAll().size();
        // set the field null
        cloudMeu.setName(null);

        // Create the CloudMeu, which fails.

        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isBadRequest());

        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVersionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuRepository.findAll().size();
        // set the field null
        cloudMeu.setVersion(null);

        // Create the CloudMeu, which fails.

        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isBadRequest());

        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMeuDefinitionIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuRepository.findAll().size();
        // set the field null
        cloudMeu.setMeuDefinition(null);

        // Create the CloudMeu, which fails.

        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isBadRequest());

        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkFileIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuRepository.findAll().size();
        // set the field null
        cloudMeu.setFileId(null);

        // Create the CloudMeu, which fails.

        restCloudMeuMockMvc.perform(post("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isBadRequest());

        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCloudMeus() throws Exception {
        // Initialize the database
        cloudMeuRepository.saveAndFlush(cloudMeu);

        // Get all the cloudMeuList
        restCloudMeuMockMvc.perform(get("/api/cloud-meus?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cloudMeu.getId().intValue())))
            .andExpect(jsonPath("$.[*].groupId").value(hasItem(DEFAULT_GROUP_ID.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].meuDefinition").value(hasItem(DEFAULT_MEU_DEFINITION.toString())))
            .andExpect(jsonPath("$.[*].fileId").value(hasItem(DEFAULT_FILE_ID.toString())));
    }

    @Test
    @Transactional
    public void getCloudMeu() throws Exception {
        // Initialize the database
        cloudMeuRepository.saveAndFlush(cloudMeu);

        // Get the cloudMeu
        restCloudMeuMockMvc.perform(get("/api/cloud-meus/{id}", cloudMeu.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cloudMeu.getId().intValue()))
            .andExpect(jsonPath("$.groupId").value(DEFAULT_GROUP_ID.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.meuDefinition").value(DEFAULT_MEU_DEFINITION.toString()))
            .andExpect(jsonPath("$.fileId").value(DEFAULT_FILE_ID.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCloudMeu() throws Exception {
        // Get the cloudMeu
        restCloudMeuMockMvc.perform(get("/api/cloud-meus/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCloudMeu() throws Exception {
        // Initialize the database
        cloudMeuRepository.saveAndFlush(cloudMeu);
        int databaseSizeBeforeUpdate = cloudMeuRepository.findAll().size();

        // Update the cloudMeu
        CloudMeu updatedCloudMeu = cloudMeuRepository.findOne(cloudMeu.getId());
        // Disconnect from session so that the updates on updatedCloudMeu are not directly saved in db
        em.detach(updatedCloudMeu);
        updatedCloudMeu
            .groupId(UPDATED_GROUP_ID)
            .name(UPDATED_NAME)
            .version(UPDATED_VERSION)
            .type(UPDATED_TYPE)
            .meuDefinition(UPDATED_MEU_DEFINITION)
            .fileId(UPDATED_FILE_ID);

        restCloudMeuMockMvc.perform(put("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCloudMeu)))
            .andExpect(status().isOk());

        // Validate the CloudMeu in the database
        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeUpdate);
        CloudMeu testCloudMeu = cloudMeuList.get(cloudMeuList.size() - 1);
        assertThat(testCloudMeu.getGroupId()).isEqualTo(UPDATED_GROUP_ID);
        assertThat(testCloudMeu.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCloudMeu.getVersion()).isEqualTo(UPDATED_VERSION);
        assertThat(testCloudMeu.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testCloudMeu.getMeuDefinition()).isEqualTo(UPDATED_MEU_DEFINITION);
        assertThat(testCloudMeu.getFileId()).isEqualTo(UPDATED_FILE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCloudMeu() throws Exception {
        int databaseSizeBeforeUpdate = cloudMeuRepository.findAll().size();

        // Create the CloudMeu

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCloudMeuMockMvc.perform(put("/api/cloud-meus")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeu)))
            .andExpect(status().isCreated());

        // Validate the CloudMeu in the database
        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCloudMeu() throws Exception {
        // Initialize the database
        cloudMeuRepository.saveAndFlush(cloudMeu);
        int databaseSizeBeforeDelete = cloudMeuRepository.findAll().size();

        // Get the cloudMeu
        restCloudMeuMockMvc.perform(delete("/api/cloud-meus/{id}", cloudMeu.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CloudMeu> cloudMeuList = cloudMeuRepository.findAll();
        assertThat(cloudMeuList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CloudMeu.class);
        CloudMeu cloudMeu1 = new CloudMeu();
        cloudMeu1.setId(1L);
        CloudMeu cloudMeu2 = new CloudMeu();
        cloudMeu2.setId(cloudMeu1.getId());
        assertThat(cloudMeu1).isEqualTo(cloudMeu2);
        cloudMeu2.setId(2L);
        assertThat(cloudMeu1).isNotEqualTo(cloudMeu2);
        cloudMeu1.setId(null);
        assertThat(cloudMeu1).isNotEqualTo(cloudMeu2);
    }
}
