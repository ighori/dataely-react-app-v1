package com.dataely.app.web.rest;

import com.dataely.app.repository.ServiceOwnerRepository;
import com.dataely.app.service.ServiceOwnerService;
import com.dataely.app.service.dto.ServiceOwnerDTO;
import com.dataely.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.dataely.app.domain.ServiceOwner}.
 */
@RestController
@RequestMapping("/api")
public class ServiceOwnerResource {

    private final Logger log = LoggerFactory.getLogger(ServiceOwnerResource.class);

    private static final String ENTITY_NAME = "serviceOwner";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ServiceOwnerService serviceOwnerService;

    private final ServiceOwnerRepository serviceOwnerRepository;

    public ServiceOwnerResource(ServiceOwnerService serviceOwnerService, ServiceOwnerRepository serviceOwnerRepository) {
        this.serviceOwnerService = serviceOwnerService;
        this.serviceOwnerRepository = serviceOwnerRepository;
    }

    /**
     * {@code POST  /service-owners} : Create a new serviceOwner.
     *
     * @param serviceOwnerDTO the serviceOwnerDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new serviceOwnerDTO, or with status {@code 400 (Bad Request)} if the serviceOwner has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/service-owners")
    public ResponseEntity<ServiceOwnerDTO> createServiceOwner(@Valid @RequestBody ServiceOwnerDTO serviceOwnerDTO)
        throws URISyntaxException {
        log.debug("REST request to save ServiceOwner : {}", serviceOwnerDTO);
        if (serviceOwnerDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceOwner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceOwnerDTO result = serviceOwnerService.save(serviceOwnerDTO);
        return ResponseEntity
            .created(new URI("/api/service-owners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /service-owners/:id} : Updates an existing serviceOwner.
     *
     * @param id the id of the serviceOwnerDTO to save.
     * @param serviceOwnerDTO the serviceOwnerDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceOwnerDTO,
     * or with status {@code 400 (Bad Request)} if the serviceOwnerDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the serviceOwnerDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/service-owners/{id}")
    public ResponseEntity<ServiceOwnerDTO> updateServiceOwner(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ServiceOwnerDTO serviceOwnerDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ServiceOwner : {}, {}", id, serviceOwnerDTO);
        if (serviceOwnerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, serviceOwnerDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!serviceOwnerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ServiceOwnerDTO result = serviceOwnerService.save(serviceOwnerDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, serviceOwnerDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /service-owners/:id} : Partial updates given fields of an existing serviceOwner, field will ignore if it is null
     *
     * @param id the id of the serviceOwnerDTO to save.
     * @param serviceOwnerDTO the serviceOwnerDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated serviceOwnerDTO,
     * or with status {@code 400 (Bad Request)} if the serviceOwnerDTO is not valid,
     * or with status {@code 404 (Not Found)} if the serviceOwnerDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the serviceOwnerDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/service-owners/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<ServiceOwnerDTO> partialUpdateServiceOwner(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ServiceOwnerDTO serviceOwnerDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ServiceOwner partially : {}, {}", id, serviceOwnerDTO);
        if (serviceOwnerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, serviceOwnerDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!serviceOwnerRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ServiceOwnerDTO> result = serviceOwnerService.partialUpdate(serviceOwnerDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, serviceOwnerDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /service-owners} : get all the serviceOwners.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of serviceOwners in body.
     */
    @GetMapping("/service-owners")
    public ResponseEntity<List<ServiceOwnerDTO>> getAllServiceOwners(Pageable pageable) {
        log.debug("REST request to get a page of ServiceOwners");
        Page<ServiceOwnerDTO> page = serviceOwnerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /service-owners/:id} : get the "id" serviceOwner.
     *
     * @param id the id of the serviceOwnerDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the serviceOwnerDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/service-owners/{id}")
    public ResponseEntity<ServiceOwnerDTO> getServiceOwner(@PathVariable Long id) {
        log.debug("REST request to get ServiceOwner : {}", id);
        Optional<ServiceOwnerDTO> serviceOwnerDTO = serviceOwnerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(serviceOwnerDTO);
    }

    /**
     * {@code DELETE  /service-owners/:id} : delete the "id" serviceOwner.
     *
     * @param id the id of the serviceOwnerDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/service-owners/{id}")
    public ResponseEntity<Void> deleteServiceOwner(@PathVariable Long id) {
        log.debug("REST request to delete ServiceOwner : {}", id);
        serviceOwnerService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
