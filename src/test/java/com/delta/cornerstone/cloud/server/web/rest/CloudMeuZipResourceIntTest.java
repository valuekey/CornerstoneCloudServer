package com.delta.cornerstone.cloud.server.web.rest;

import com.delta.cornerstone.cloud.server.CornerstoneCloudServerApp;

import com.delta.cornerstone.cloud.server.domain.CloudMeuZip;
import com.delta.cornerstone.cloud.server.domain.CloudMeu;
import com.delta.cornerstone.cloud.server.repository.CloudMeuZipRepository;
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
 * Test class for the CloudMeuZipResource REST controller.
 *
 * @see CloudMeuZipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = CornerstoneCloudServerApp.class)
public class CloudMeuZipResourceIntTest {

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_ZIP_FILE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ZIP_FILE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_ZIP_FILE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ZIP_FILE_CONTENT_TYPE = "image/png";

    @Autowired
    private CloudMeuZipRepository cloudMeuZipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCloudMeuZipMockMvc;

    private CloudMeuZip cloudMeuZip;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CloudMeuZipResource cloudMeuZipResource = new CloudMeuZipResource(cloudMeuZipRepository);
        this.restCloudMeuZipMockMvc = MockMvcBuilders.standaloneSetup(cloudMeuZipResource)
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
    public static CloudMeuZip createEntity(EntityManager em) {
        CloudMeuZip cloudMeuZip = new CloudMeuZip()
            .fileName(DEFAULT_FILE_NAME)
            .zipFile(DEFAULT_ZIP_FILE)
            .zipFileContentType(DEFAULT_ZIP_FILE_CONTENT_TYPE);
        // Add required entity
        CloudMeu cloudMeu = CloudMeuResourceIntTest.createEntity(em);
        em.persist(cloudMeu);
        em.flush();
        cloudMeuZip.setCloudMeu(cloudMeu);
        return cloudMeuZip;
    }

    @Before
    public void initTest() {
        cloudMeuZip = createEntity(em);
    }

    @Test
    @Transactional
    public void createCloudMeuZip() throws Exception {
        int databaseSizeBeforeCreate = cloudMeuZipRepository.findAll().size();

        // Create the CloudMeuZip
        restCloudMeuZipMockMvc.perform(post("/api/cloud-meu-zips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuZip)))
            .andExpect(status().isCreated());

        // Validate the CloudMeuZip in the database
        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeCreate + 1);
        CloudMeuZip testCloudMeuZip = cloudMeuZipList.get(cloudMeuZipList.size() - 1);
        assertThat(testCloudMeuZip.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testCloudMeuZip.getZipFile()).isEqualTo(DEFAULT_ZIP_FILE);
        assertThat(testCloudMeuZip.getZipFileContentType()).isEqualTo(DEFAULT_ZIP_FILE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createCloudMeuZipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cloudMeuZipRepository.findAll().size();

        // Create the CloudMeuZip with an existing ID
        cloudMeuZip.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCloudMeuZipMockMvc.perform(post("/api/cloud-meu-zips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuZip)))
            .andExpect(status().isBadRequest());

        // Validate the CloudMeuZip in the database
        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFileNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuZipRepository.findAll().size();
        // set the field null
        cloudMeuZip.setFileName(null);

        // Create the CloudMeuZip, which fails.

        restCloudMeuZipMockMvc.perform(post("/api/cloud-meu-zips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuZip)))
            .andExpect(status().isBadRequest());

        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkZipFileIsRequired() throws Exception {
        int databaseSizeBeforeTest = cloudMeuZipRepository.findAll().size();
        // set the field null
        cloudMeuZip.setZipFile(null);

        // Create the CloudMeuZip, which fails.

        restCloudMeuZipMockMvc.perform(post("/api/cloud-meu-zips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuZip)))
            .andExpect(status().isBadRequest());

        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCloudMeuZips() throws Exception {
        // Initialize the database
        cloudMeuZipRepository.saveAndFlush(cloudMeuZip);

        // Get all the cloudMeuZipList
        restCloudMeuZipMockMvc.perform(get("/api/cloud-meu-zips?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cloudMeuZip.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME.toString())))
            .andExpect(jsonPath("$.[*].zipFileContentType").value(hasItem(DEFAULT_ZIP_FILE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].zipFile").value(hasItem(Base64Utils.encodeToString(DEFAULT_ZIP_FILE))));
    }

    @Test
    @Transactional
    public void getCloudMeuZip() throws Exception {
        // Initialize the database
        cloudMeuZipRepository.saveAndFlush(cloudMeuZip);

        // Get the cloudMeuZip
        restCloudMeuZipMockMvc.perform(get("/api/cloud-meu-zips/{id}", cloudMeuZip.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cloudMeuZip.getId().intValue()))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME.toString()))
            .andExpect(jsonPath("$.zipFileContentType").value(DEFAULT_ZIP_FILE_CONTENT_TYPE))
            .andExpect(jsonPath("$.zipFile").value(Base64Utils.encodeToString(DEFAULT_ZIP_FILE)));
    }

    @Test
    @Transactional
    public void getNonExistingCloudMeuZip() throws Exception {
        // Get the cloudMeuZip
        restCloudMeuZipMockMvc.perform(get("/api/cloud-meu-zips/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCloudMeuZip() throws Exception {
        // Initialize the database
        cloudMeuZipRepository.saveAndFlush(cloudMeuZip);
        int databaseSizeBeforeUpdate = cloudMeuZipRepository.findAll().size();

        // Update the cloudMeuZip
        CloudMeuZip updatedCloudMeuZip = cloudMeuZipRepository.findOne(cloudMeuZip.getId());
        // Disconnect from session so that the updates on updatedCloudMeuZip are not directly saved in db
        em.detach(updatedCloudMeuZip);
        updatedCloudMeuZip
            .fileName(UPDATED_FILE_NAME)
            .zipFile(UPDATED_ZIP_FILE)
            .zipFileContentType(UPDATED_ZIP_FILE_CONTENT_TYPE);

        restCloudMeuZipMockMvc.perform(put("/api/cloud-meu-zips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCloudMeuZip)))
            .andExpect(status().isOk());

        // Validate the CloudMeuZip in the database
        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeUpdate);
        CloudMeuZip testCloudMeuZip = cloudMeuZipList.get(cloudMeuZipList.size() - 1);
        assertThat(testCloudMeuZip.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testCloudMeuZip.getZipFile()).isEqualTo(UPDATED_ZIP_FILE);
        assertThat(testCloudMeuZip.getZipFileContentType()).isEqualTo(UPDATED_ZIP_FILE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingCloudMeuZip() throws Exception {
        int databaseSizeBeforeUpdate = cloudMeuZipRepository.findAll().size();

        // Create the CloudMeuZip

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCloudMeuZipMockMvc.perform(put("/api/cloud-meu-zips")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cloudMeuZip)))
            .andExpect(status().isCreated());

        // Validate the CloudMeuZip in the database
        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCloudMeuZip() throws Exception {
        // Initialize the database
        cloudMeuZipRepository.saveAndFlush(cloudMeuZip);
        int databaseSizeBeforeDelete = cloudMeuZipRepository.findAll().size();

        // Get the cloudMeuZip
        restCloudMeuZipMockMvc.perform(delete("/api/cloud-meu-zips/{id}", cloudMeuZip.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CloudMeuZip> cloudMeuZipList = cloudMeuZipRepository.findAll();
        assertThat(cloudMeuZipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CloudMeuZip.class);
        CloudMeuZip cloudMeuZip1 = new CloudMeuZip();
        cloudMeuZip1.setId(1L);
        CloudMeuZip cloudMeuZip2 = new CloudMeuZip();
        cloudMeuZip2.setId(cloudMeuZip1.getId());
        assertThat(cloudMeuZip1).isEqualTo(cloudMeuZip2);
        cloudMeuZip2.setId(2L);
        assertThat(cloudMeuZip1).isNotEqualTo(cloudMeuZip2);
        cloudMeuZip1.setId(null);
        assertThat(cloudMeuZip1).isNotEqualTo(cloudMeuZip2);
    }
}
