package com.delta.cornerstone.cloud.server.web.rest;

import com.delta.cornerstone.cloud.server.CornerstoneCloudServerApp;

import com.delta.cornerstone.cloud.server.domain.CloudApp;
import com.delta.cornerstone.cloud.server.repository.CloudAppRepository;
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

import com.delta.cornerstone.cloud.server.domain.enumeration.AppStatus;
/**
 * Test class for the CloudAppResource REST controller.
 *
 * @see CloudAppResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CornerstoneCloudServerApp.class)
public class CloudAppResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_EPGS = "AAAAAAAAAA";
    private static final String UPDATED_EPGS = "BBBBBBBBBB";

    private static final String DEFAULT_CONFIGURATIONS = "AAAAAAAAAA";
    private static final String UPDATED_CONFIGURATIONS = "BBBBBBBBBB";

    private static final String DEFAULT_UPLOAD_FILE = "AAAAAAAAAA";
    private static final String UPDATED_UPLOAD_FILE = "BBBBBBBBBB";

    private static final AppStatus DEFAULT_STATUS = AppStatus.APP_BUILDING;
    private static final AppStatus UPDATED_STATUS = AppStatus.APP_BUILD_SUCCESS;

    private static final String DEFAULT_ACCOUNT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ACCOUNT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_BUILD_FILE_ID = "AAAAAAAAAA";
    private static final String UPDATED_BUILD_FILE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_RESOUCE_MAPPING = "AAAAAAAAAA";
    private static final String UPDATED_RESOUCE_MAPPING = "BBBBBBBBBB";

    private static final String DEFAULT_BUILD_LOG = "AAAAAAAAAA";
    private static final String UPDATED_BUILD_LOG = "BBBBBBBBBB";

    private static final String DEFAULT_APP_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_APP_CONTENT = "BBBBBBBBBB";

    @Autowired
    private CloudAppRepository cloudAppRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCloudAppMockMvc;

    private CloudApp cloudApp;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CloudAppResource cloudAppResource = new CloudAppResource(cloudAppRepository);
        this.restCloudAppMockMvc = MockMvcBuilders.standaloneSetup(cloudAppResource)
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
    public static CloudApp createEntity(EntityManager em) {
        CloudApp cloudApp = new CloudApp()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .epgs(DEFAULT_EPGS)
            .configurations(DEFAULT_CONFIGURATIONS)
            .uploadFile(DEFAULT_UPLOAD_FILE)
            .status(DEFAULT_STATUS)
            .accountName(DEFAULT_ACCOUNT_NAME)
            .buildFileId(DEFAULT_BUILD_FILE_ID)
            .resouceMapping(DEFAULT_RESOUCE_MAPPING)
            .buildLog(DEFAULT_BUILD_LOG)
            .appContent(DEFAULT_APP_CONTENT);
        return cloudApp;
    }

    @Before
    public void initTest() {
        cloudApp = createEntity(em);
    }

    @Test
    @Transactional
    public void createCloudApp() throws Exception {
        int databaseSizeBeforeCreate = cloudAppRepository.findAll().size();

        // Create the CloudApp
        restCloudAppMockMvc.perform(post("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudApp)))
            .andExpect(status().isCreated());

        // Validate the CloudApp in the database
        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeCreate + 1);
        CloudApp testCloudApp = cloudAppList.get(cloudAppList.size() - 1);
        assertThat(testCloudApp.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCloudApp.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testCloudApp.getEpgs()).isEqualTo(DEFAULT_EPGS);
        assertThat(testCloudApp.getConfigurations()).isEqualTo(DEFAULT_CONFIGURATIONS);
        assertThat(testCloudApp.getUploadFile()).isEqualTo(DEFAULT_UPLOAD_FILE);
        assertThat(testCloudApp.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testCloudApp.getAccountName()).isEqualTo(DEFAULT_ACCOUNT_NAME);
        assertThat(testCloudApp.getBuildFileId()).isEqualTo(DEFAULT_BUILD_FILE_ID);
        assertThat(testCloudApp.getResouceMapping()).isEqualTo(DEFAULT_RESOUCE_MAPPING);
        assertThat(testCloudApp.getBuildLog()).isEqualTo(DEFAULT_BUILD_LOG);
        assertThat(testCloudApp.getAppContent()).isEqualTo(DEFAULT_APP_CONTENT);
    }

    @Test
    @Transactional
    public void createCloudAppWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cloudAppRepository.findAll().size();

        // Create the CloudApp with an existing ID
        cloudApp.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCloudAppMockMvc.perform(post("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudApp)))
            .andExpect(status().isBadRequest());

        // Validate the CloudApp in the database
        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudAppRepository.findAll().size();
        // set the field null
        cloudApp.setName(null);

        // Create the CloudApp, which fails.

        restCloudAppMockMvc.perform(post("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudApp)))
            .andExpect(status().isBadRequest());

        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEpgsIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudAppRepository.findAll().size();
        // set the field null
        cloudApp.setEpgs(null);

        // Create the CloudApp, which fails.

        restCloudAppMockMvc.perform(post("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudApp)))
            .andExpect(status().isBadRequest());

        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAccountNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudAppRepository.findAll().size();
        // set the field null
        cloudApp.setAccountName(null);

        // Create the CloudApp, which fails.

        restCloudAppMockMvc.perform(post("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudApp)))
            .andExpect(status().isBadRequest());

        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCloudApps() throws Exception {
        // Initialize the database
        cloudAppRepository.saveAndFlush(cloudApp);

        // Get all the cloudAppList
        restCloudAppMockMvc.perform(get("/api/cloud-apps?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cloudApp.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].epgs").value(hasItem(DEFAULT_EPGS.toString())))
            .andExpect(jsonPath("$.[*].configurations").value(hasItem(DEFAULT_CONFIGURATIONS.toString())))
            .andExpect(jsonPath("$.[*].uploadFile").value(hasItem(DEFAULT_UPLOAD_FILE.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())))
            .andExpect(jsonPath("$.[*].accountName").value(hasItem(DEFAULT_ACCOUNT_NAME.toString())))
            .andExpect(jsonPath("$.[*].buildFileId").value(hasItem(DEFAULT_BUILD_FILE_ID.toString())))
            .andExpect(jsonPath("$.[*].resouceMapping").value(hasItem(DEFAULT_RESOUCE_MAPPING.toString())))
            .andExpect(jsonPath("$.[*].buildLog").value(hasItem(DEFAULT_BUILD_LOG.toString())))
            .andExpect(jsonPath("$.[*].appContent").value(hasItem(DEFAULT_APP_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getCloudApp() throws Exception {
        // Initialize the database
        cloudAppRepository.saveAndFlush(cloudApp);

        // Get the cloudApp
        restCloudAppMockMvc.perform(get("/api/cloud-apps/{id}", cloudApp.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cloudApp.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.epgs").value(DEFAULT_EPGS.toString()))
            .andExpect(jsonPath("$.configurations").value(DEFAULT_CONFIGURATIONS.toString()))
            .andExpect(jsonPath("$.uploadFile").value(DEFAULT_UPLOAD_FILE.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()))
            .andExpect(jsonPath("$.accountName").value(DEFAULT_ACCOUNT_NAME.toString()))
            .andExpect(jsonPath("$.buildFileId").value(DEFAULT_BUILD_FILE_ID.toString()))
            .andExpect(jsonPath("$.resouceMapping").value(DEFAULT_RESOUCE_MAPPING.toString()))
            .andExpect(jsonPath("$.buildLog").value(DEFAULT_BUILD_LOG.toString()))
            .andExpect(jsonPath("$.appContent").value(DEFAULT_APP_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCloudApp() throws Exception {
        // Get the cloudApp
        restCloudAppMockMvc.perform(get("/api/cloud-apps/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCloudApp() throws Exception {
        // Initialize the database
        cloudAppRepository.saveAndFlush(cloudApp);
        int databaseSizeBeforeUpdate = cloudAppRepository.findAll().size();

        // Update the cloudApp
        CloudApp updatedCloudApp = cloudAppRepository.findOne(cloudApp.getId());
        // Disconnect from session so that the updates on updatedCloudApp are not directly saved in db
        em.detach(updatedCloudApp);
        updatedCloudApp
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .epgs(UPDATED_EPGS)
            .configurations(UPDATED_CONFIGURATIONS)
            .uploadFile(UPDATED_UPLOAD_FILE)
            .status(UPDATED_STATUS)
            .accountName(UPDATED_ACCOUNT_NAME)
            .buildFileId(UPDATED_BUILD_FILE_ID)
            .resouceMapping(UPDATED_RESOUCE_MAPPING)
            .buildLog(UPDATED_BUILD_LOG)
            .appContent(UPDATED_APP_CONTENT);

        restCloudAppMockMvc.perform(put("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCloudApp)))
            .andExpect(status().isOk());

        // Validate the CloudApp in the database
        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeUpdate);
        CloudApp testCloudApp = cloudAppList.get(cloudAppList.size() - 1);
        assertThat(testCloudApp.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCloudApp.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testCloudApp.getEpgs()).isEqualTo(UPDATED_EPGS);
        assertThat(testCloudApp.getConfigurations()).isEqualTo(UPDATED_CONFIGURATIONS);
        assertThat(testCloudApp.getUploadFile()).isEqualTo(UPDATED_UPLOAD_FILE);
        assertThat(testCloudApp.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testCloudApp.getAccountName()).isEqualTo(UPDATED_ACCOUNT_NAME);
        assertThat(testCloudApp.getBuildFileId()).isEqualTo(UPDATED_BUILD_FILE_ID);
        assertThat(testCloudApp.getResouceMapping()).isEqualTo(UPDATED_RESOUCE_MAPPING);
        assertThat(testCloudApp.getBuildLog()).isEqualTo(UPDATED_BUILD_LOG);
        assertThat(testCloudApp.getAppContent()).isEqualTo(UPDATED_APP_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCloudApp() throws Exception {
        int databaseSizeBeforeUpdate = cloudAppRepository.findAll().size();

        // Create the CloudApp

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCloudAppMockMvc.perform(put("/api/cloud-apps")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudApp)))
            .andExpect(status().isCreated());

        // Validate the CloudApp in the database
        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCloudApp() throws Exception {
        // Initialize the database
        cloudAppRepository.saveAndFlush(cloudApp);
        int databaseSizeBeforeDelete = cloudAppRepository.findAll().size();

        // Get the cloudApp
        restCloudAppMockMvc.perform(delete("/api/cloud-apps/{id}", cloudApp.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CloudApp> cloudAppList = cloudAppRepository.findAll();
        assertThat(cloudAppList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CloudApp.class);
        CloudApp cloudApp1 = new CloudApp();
        cloudApp1.setId(1L);
        CloudApp cloudApp2 = new CloudApp();
        cloudApp2.setId(cloudApp1.getId());
        assertThat(cloudApp1).isEqualTo(cloudApp2);
        cloudApp2.setId(2L);
        assertThat(cloudApp1).isNotEqualTo(cloudApp2);
        cloudApp1.setId(null);
        assertThat(cloudApp1).isNotEqualTo(cloudApp2);
    }
}
