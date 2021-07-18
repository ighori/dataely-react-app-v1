package com.dataely.app.service;

import com.dataely.app.service.dto.ServiceOwnerDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.dataely.app.domain.ServiceOwner}.
 */
public interface ServiceOwnerService {
    /**
     * Save a serviceOwner.
     *
     * @param serviceOwnerDTO the entity to save.
     * @return the persisted entity.
     */
    ServiceOwnerDTO save(ServiceOwnerDTO serviceOwnerDTO);

    /**
     * Partially updates a serviceOwner.
     *
     * @param serviceOwnerDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ServiceOwnerDTO> partialUpdate(ServiceOwnerDTO serviceOwnerDTO);

    /**
     * Get all the serviceOwners.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ServiceOwnerDTO> findAll(Pageable pageable);

    /**
     * Get the "id" serviceOwner.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ServiceOwnerDTO> findOne(Long id);

    /**
     * Delete the "id" serviceOwner.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
