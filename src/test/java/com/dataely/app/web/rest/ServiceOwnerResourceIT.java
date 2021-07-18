package com.dataely.app.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.dataely.app.IntegrationTest;
import com.dataely.app.domain.ServiceOwner;
import com.dataely.app.repository.ServiceOwnerRepository;
import com.dataely.app.service.dto.ServiceOwnerDTO;
import com.dataely.app.service.mapper.ServiceOwnerMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

/**
 * Integration tests for the {@link ServiceOwnerResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ServiceOwnerResourceIT {

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "eP@f`bZ$M.z]HL[";
    private static final String UPDATED_EMAIL = "xW<k$@6/2O.juqR";

    private static final String DEFAULT_CONTACT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_CONTACT_NUMBER = "BBBBBBBBBB";

    private static final String DEFAULT_EXTENSION = "AAAAAAAAAA";
    private static final String UPDATED_EXTENSION = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String ENTITY_API_URL = "/api/service-owners";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ServiceOwnerRepository serviceOwnerRepository;

    @Autowired
    private ServiceOwnerMapper serviceOwnerMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restServiceOwnerMockMvc;

    private ServiceOwner serviceOwner;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceOwner createEntity(EntityManager em) {
        ServiceOwner serviceOwner = new ServiceOwner()
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .name(DEFAULT_NAME)
            .role(DEFAULT_ROLE)
            .email(DEFAULT_EMAIL)
            .contactNumber(DEFAULT_CONTACT_NUMBER)
            .extension(DEFAULT_EXTENSION)
            .location(DEFAULT_LOCATION)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return serviceOwner;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceOwner createUpdatedEntity(EntityManager em) {
        ServiceOwner serviceOwner = new ServiceOwner()
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .name(UPDATED_NAME)
            .role(UPDATED_ROLE)
            .email(UPDATED_EMAIL)
            .contactNumber(UPDATED_CONTACT_NUMBER)
            .extension(UPDATED_EXTENSION)
            .location(UPDATED_LOCATION)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        return serviceOwner;
    }

    @BeforeEach
    public void initTest() {
        serviceOwner = createEntity(em);
    }

    @Test
    @Transactional
    void createServiceOwner() throws Exception {
        int databaseSizeBeforeCreate = serviceOwnerRepository.findAll().size();
        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);
        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isCreated());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceOwner testServiceOwner = serviceOwnerList.get(serviceOwnerList.size() - 1);
        assertThat(testServiceOwner.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testServiceOwner.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testServiceOwner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testServiceOwner.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testServiceOwner.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testServiceOwner.getContactNumber()).isEqualTo(DEFAULT_CONTACT_NUMBER);
        assertThat(testServiceOwner.getExtension()).isEqualTo(DEFAULT_EXTENSION);
        assertThat(testServiceOwner.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testServiceOwner.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testServiceOwner.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testServiceOwner.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testServiceOwner.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testServiceOwner.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testServiceOwner.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void createServiceOwnerWithExistingId() throws Exception {
        // Create the ServiceOwner with an existing ID
        serviceOwner.setId(1L);
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        int databaseSizeBeforeCreate = serviceOwnerRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkFirstNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceOwnerRepository.findAll().size();
        // set the field null
        serviceOwner.setFirstName(null);

        // Create the ServiceOwner, which fails.
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLastNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceOwnerRepository.findAll().size();
        // set the field null
        serviceOwner.setLastName(null);

        // Create the ServiceOwner, which fails.
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceOwnerRepository.findAll().size();
        // set the field null
        serviceOwner.setName(null);

        // Create the ServiceOwner, which fails.
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkRoleIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceOwnerRepository.findAll().size();
        // set the field null
        serviceOwner.setRole(null);

        // Create the ServiceOwner, which fails.
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceOwnerRepository.findAll().size();
        // set the field null
        serviceOwner.setEmail(null);

        // Create the ServiceOwner, which fails.
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkContactNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = serviceOwnerRepository.findAll().size();
        // set the field null
        serviceOwner.setContactNumber(null);

        // Create the ServiceOwner, which fails.
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        restServiceOwnerMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllServiceOwners() throws Exception {
        // Initialize the database
        serviceOwnerRepository.saveAndFlush(serviceOwner);

        // Get all the serviceOwnerList
        restServiceOwnerMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceOwner.getId().intValue())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].contactNumber").value(hasItem(DEFAULT_CONTACT_NUMBER)))
            .andExpect(jsonPath("$.[*].extension").value(hasItem(DEFAULT_EXTENSION)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1)))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY)))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY)))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }

    @Test
    @Transactional
    void getServiceOwner() throws Exception {
        // Initialize the database
        serviceOwnerRepository.saveAndFlush(serviceOwner);

        // Get the serviceOwner
        restServiceOwnerMockMvc
            .perform(get(ENTITY_API_URL_ID, serviceOwner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(serviceOwner.getId().intValue()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.contactNumber").value(DEFAULT_CONTACT_NUMBER))
            .andExpect(jsonPath("$.extension").value(DEFAULT_EXTENSION))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    void getNonExistingServiceOwner() throws Exception {
        // Get the serviceOwner
        restServiceOwnerMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewServiceOwner() throws Exception {
        // Initialize the database
        serviceOwnerRepository.saveAndFlush(serviceOwner);

        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();

        // Update the serviceOwner
        ServiceOwner updatedServiceOwner = serviceOwnerRepository.findById(serviceOwner.getId()).get();
        // Disconnect from session so that the updates on updatedServiceOwner are not directly saved in db
        em.detach(updatedServiceOwner);
        updatedServiceOwner
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .name(UPDATED_NAME)
            .role(UPDATED_ROLE)
            .email(UPDATED_EMAIL)
            .contactNumber(UPDATED_CONTACT_NUMBER)
            .extension(UPDATED_EXTENSION)
            .location(UPDATED_LOCATION)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(updatedServiceOwner);

        restServiceOwnerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, serviceOwnerDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isOk());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
        ServiceOwner testServiceOwner = serviceOwnerList.get(serviceOwnerList.size() - 1);
        assertThat(testServiceOwner.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testServiceOwner.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testServiceOwner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testServiceOwner.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testServiceOwner.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testServiceOwner.getContactNumber()).isEqualTo(UPDATED_CONTACT_NUMBER);
        assertThat(testServiceOwner.getExtension()).isEqualTo(UPDATED_EXTENSION);
        assertThat(testServiceOwner.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testServiceOwner.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testServiceOwner.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testServiceOwner.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testServiceOwner.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testServiceOwner.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testServiceOwner.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingServiceOwner() throws Exception {
        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();
        serviceOwner.setId(count.incrementAndGet());

        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceOwnerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, serviceOwnerDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchServiceOwner() throws Exception {
        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();
        serviceOwner.setId(count.incrementAndGet());

        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceOwnerMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamServiceOwner() throws Exception {
        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();
        serviceOwner.setId(count.incrementAndGet());

        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceOwnerMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateServiceOwnerWithPatch() throws Exception {
        // Initialize the database
        serviceOwnerRepository.saveAndFlush(serviceOwner);

        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();

        // Update the serviceOwner using partial update
        ServiceOwner partialUpdatedServiceOwner = new ServiceOwner();
        partialUpdatedServiceOwner.setId(serviceOwner.getId());

        partialUpdatedServiceOwner.addressLine1(UPDATED_ADDRESS_LINE_1).country(UPDATED_COUNTRY);

        restServiceOwnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedServiceOwner.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedServiceOwner))
            )
            .andExpect(status().isOk());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
        ServiceOwner testServiceOwner = serviceOwnerList.get(serviceOwnerList.size() - 1);
        assertThat(testServiceOwner.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testServiceOwner.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testServiceOwner.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testServiceOwner.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testServiceOwner.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testServiceOwner.getContactNumber()).isEqualTo(DEFAULT_CONTACT_NUMBER);
        assertThat(testServiceOwner.getExtension()).isEqualTo(DEFAULT_EXTENSION);
        assertThat(testServiceOwner.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testServiceOwner.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testServiceOwner.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testServiceOwner.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testServiceOwner.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testServiceOwner.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testServiceOwner.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateServiceOwnerWithPatch() throws Exception {
        // Initialize the database
        serviceOwnerRepository.saveAndFlush(serviceOwner);

        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();

        // Update the serviceOwner using partial update
        ServiceOwner partialUpdatedServiceOwner = new ServiceOwner();
        partialUpdatedServiceOwner.setId(serviceOwner.getId());

        partialUpdatedServiceOwner
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .name(UPDATED_NAME)
            .role(UPDATED_ROLE)
            .email(UPDATED_EMAIL)
            .contactNumber(UPDATED_CONTACT_NUMBER)
            .extension(UPDATED_EXTENSION)
            .location(UPDATED_LOCATION)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restServiceOwnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedServiceOwner.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedServiceOwner))
            )
            .andExpect(status().isOk());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
        ServiceOwner testServiceOwner = serviceOwnerList.get(serviceOwnerList.size() - 1);
        assertThat(testServiceOwner.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testServiceOwner.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testServiceOwner.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testServiceOwner.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testServiceOwner.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testServiceOwner.getContactNumber()).isEqualTo(UPDATED_CONTACT_NUMBER);
        assertThat(testServiceOwner.getExtension()).isEqualTo(UPDATED_EXTENSION);
        assertThat(testServiceOwner.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testServiceOwner.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testServiceOwner.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testServiceOwner.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testServiceOwner.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testServiceOwner.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testServiceOwner.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingServiceOwner() throws Exception {
        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();
        serviceOwner.setId(count.incrementAndGet());

        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceOwnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, serviceOwnerDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchServiceOwner() throws Exception {
        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();
        serviceOwner.setId(count.incrementAndGet());

        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceOwnerMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamServiceOwner() throws Exception {
        int databaseSizeBeforeUpdate = serviceOwnerRepository.findAll().size();
        serviceOwner.setId(count.incrementAndGet());

        // Create the ServiceOwner
        ServiceOwnerDTO serviceOwnerDTO = serviceOwnerMapper.toDto(serviceOwner);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restServiceOwnerMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(serviceOwnerDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ServiceOwner in the database
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteServiceOwner() throws Exception {
        // Initialize the database
        serviceOwnerRepository.saveAndFlush(serviceOwner);

        int databaseSizeBeforeDelete = serviceOwnerRepository.findAll().size();

        // Delete the serviceOwner
        restServiceOwnerMockMvc
            .perform(delete(ENTITY_API_URL_ID, serviceOwner.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ServiceOwner> serviceOwnerList = serviceOwnerRepository.findAll();
        assertThat(serviceOwnerList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
