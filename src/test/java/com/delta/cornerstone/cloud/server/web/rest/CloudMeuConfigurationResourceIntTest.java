package com.delta.cornerstone.cloud.server.web.rest;

import com.delta.cornerstone.cloud.server.CornerstoneCloudServerApp;

import com.delta.cornerstone.cloud.server.domain.CloudMeuConfiguration;
import com.delta.cornerstone.cloud.server.domain.CloudMeu;
import com.delta.cornerstone.cloud.server.repository.CloudMeuConfigurationRepository;
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
 * Test class for the CloudMeuConfigurationResource REST controller.
 *
 * @see CloudMeuConfigurationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CornerstoneCloudServerApp.class)
public class CloudMeuConfigurationResourceIntTest {

    private static final String DEFAULT_FILENAME = "AAAAAAAAAA";
    private static final String UPDATED_FILENAME = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private CloudMeuConfigurationRepository cloudMeuConfigurationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCloudMeuConfigurationMockMvc;

    private CloudMeuConfiguration cloudMeuConfiguration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CloudMeuConfigurationResource cloudMeuConfigurationResource = new CloudMeuConfigurationResource(cloudMeuConfigurationRepository);
        this.restCloudMeuConfigurationMockMvc = MockMvcBuilders.standaloneSetup(cloudMeuConfigurationResource)
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
    public static CloudMeuConfiguration createEntity(EntityManager em) {
        CloudMeuConfiguration cloudMeuConfiguration = new CloudMeuConfiguration()
            .filename(DEFAULT_FILENAME)
            .content(DEFAULT_CONTENT);
        // Add required entity
        CloudMeu cloudMeu = CloudMeuResourceIntTest.createEntity(em);
        em.persist(cloudMeu);
        em.flush();
        cloudMeuConfiguration.setCloudMeu(cloudMeu);
        return cloudMeuConfiguration;
    }

    @Before
    public void initTest() {
        cloudMeuConfiguration = createEntity(em);
    }

    @Test
    @Transactional
    public void createCloudMeuConfiguration() throws Exception {
        int databaseSizeBeforeCreate = cloudMeuConfigurationRepository.findAll().size();

        // Create the CloudMeuConfiguration
        restCloudMeuConfigurationMockMvc.perform(post("/api/cloud-meu-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuConfiguration)))
            .andExpect(status().isCreated());

        // Validate the CloudMeuConfiguration in the database
        List<CloudMeuConfiguration> cloudMeuConfigurationList = cloudMeuConfigurationRepository.findAll();
        assertThat(cloudMeuConfigurationList).hasSize(databaseSizeBeforeCreate + 1);
        CloudMeuConfiguration testCloudMeuConfiguration = cloudMeuConfigurationList.get(cloudMeuConfigurationList.size() - 1);
        assertThat(testCloudMeuConfiguration.getFilename()).isEqualTo(DEFAULT_FILENAME);
        assertThat(testCloudMeuConfiguration.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createCloudMeuConfigurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cloudMeuConfigurationRepository.findAll().size();

        // Create the CloudMeuConfiguration with an existing ID
        cloudMeuConfiguration.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCloudMeuConfigurationMockMvc.perform(post("/api/cloud-meu-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the CloudMeuConfiguration in the database
        List<CloudMeuConfiguration> cloudMeuConfigurationList = cloudMeuConfigurationRepository.findAll();
        assertThat(cloudMeuConfigurationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCloudMeuConfigurations() throws Exception {
        // Initialize the database
        cloudMeuConfigurationRepository.saveAndFlush(cloudMeuConfiguration);

        // Get all the cloudMeuConfigurationList
        restCloudMeuConfigurationMockMvc.perform(get("/api/cloud-meu-configurations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cloudMeuConfiguration.getId().intValue())))
            .andExpect(jsonPath("$.[*].filename").value(hasItem(DEFAULT_FILENAME.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getCloudMeuConfiguration() throws Exception {
        // Initialize the database
        cloudMeuConfigurationRepository.saveAndFlush(cloudMeuConfiguration);

        // Get the cloudMeuConfiguration
        restCloudMeuConfigurationMockMvc.perform(get("/api/cloud-meu-configurations/{id}", cloudMeuConfiguration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cloudMeuConfiguration.getId().intValue()))
            .andExpect(jsonPath("$.filename").value(DEFAULT_FILENAME.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCloudMeuConfiguration() throws Exception {
        // Get the cloudMeuConfiguration
        restCloudMeuConfigurationMockMvc.perform(get("/api/cloud-meu-configurations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCloudMeuConfiguration() throws Exception {
        // Initialize the database
        cloudMeuConfigurationRepository.saveAndFlush(cloudMeuConfiguration);
        int databaseSizeBeforeUpdate = cloudMeuConfigurationRepository.findAll().size();

        // Update the cloudMeuConfiguration
        CloudMeuConfiguration updatedCloudMeuConfiguration = cloudMeuConfigurationRepository.findOne(cloudMeuConfiguration.getId());
        // Disconnect from session so that the updates on updatedCloudMeuConfiguration are not directly saved in db
        em.detach(updatedCloudMeuConfiguration);
        updatedCloudMeuConfiguration
            .filename(UPDATED_FILENAME)
            .content(UPDATED_CONTENT);

        restCloudMeuConfigurationMockMvc.perform(put("/api/cloud-meu-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCloudMeuConfiguration)))
            .andExpect(status().isOk());

        // Validate the CloudMeuConfiguration in the database
        List<CloudMeuConfiguration> cloudMeuConfigurationList = cloudMeuConfigurationRepository.findAll();
        assertThat(cloudMeuConfigurationList).hasSize(databaseSizeBeforeUpdate);
        CloudMeuConfiguration testCloudMeuConfiguration = cloudMeuConfigurationList.get(cloudMeuConfigurationList.size() - 1);
        assertThat(testCloudMeuConfiguration.getFilename()).isEqualTo(UPDATED_FILENAME);
        assertThat(testCloudMeuConfiguration.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCloudMeuConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = cloudMeuConfigurationRepository.findAll().size();

        // Create the CloudMeuConfiguration

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCloudMeuConfigurationMockMvc.perform(put("/api/cloud-meu-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuConfiguration)))
            .andExpect(status().isCreated());

        // Validate the CloudMeuConfiguration in the database
        List<CloudMeuConfiguration> cloudMeuConfigurationList = cloudMeuConfigurationRepository.findAll();
        assertThat(cloudMeuConfigurationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCloudMeuConfiguration() throws Exception {
        // Initialize the database
        cloudMeuConfigurationRepository.saveAndFlush(cloudMeuConfiguration);
        int databaseSizeBeforeDelete = cloudMeuConfigurationRepository.findAll().size();

        // Get the cloudMeuConfiguration
        restCloudMeuConfigurationMockMvc.perform(delete("/api/cloud-meu-configurations/{id}", cloudMeuConfiguration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CloudMeuConfiguration> cloudMeuConfigurationList = cloudMeuConfigurationRepository.findAll();
        assertThat(cloudMeuConfigurationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CloudMeuConfiguration.class);
        CloudMeuConfiguration cloudMeuConfiguration1 = new CloudMeuConfiguration();
        cloudMeuConfiguration1.setId(1L);
        CloudMeuConfiguration cloudMeuConfiguration2 = new CloudMeuConfiguration();
        cloudMeuConfiguration2.setId(cloudMeuConfiguration1.getId());
        assertThat(cloudMeuConfiguration1).isEqualTo(cloudMeuConfiguration2);
        cloudMeuConfiguration2.setId(2L);
        assertThat(cloudMeuConfiguration1).isNotEqualTo(cloudMeuConfiguration2);
        cloudMeuConfiguration1.setId(null);
        assertThat(cloudMeuConfiguration1).isNotEqualTo(cloudMeuConfiguration2);
    }
}
