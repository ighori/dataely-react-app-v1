package com.dataely.app.service.impl;

import com.dataely.app.domain.ServiceOwner;
import com.dataely.app.repository.ServiceOwnerRepository;
import com.dataely.app.service.ServiceOwnerService;
import com.dataely.app.service.dto.ServiceOwnerDTO;
import com.dataely.app.service.mapper.ServiceOwnerMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ServiceOwner}.
 */
@Service
@Transactional
public class ServiceOwnerServiceImpl implements ServiceOwnerService {

    private final Logger log = LoggerFactory.getLogger(ServiceOwnerServiceImpl.class);

    private final ServiceOwnerRepository serviceOwnerRepository;

    private final ServiceOwnerMapper serviceOwnerMapper;

    public ServiceOwnerServiceImpl(ServiceOwnerRepository serviceOwnerRepository, ServiceOwnerMapper serviceOwnerMapper) {
        this.serviceOwnerRepository = serviceOwnerRepository;
        this.serviceOwnerMapper = serviceOwnerMapper;
    }

    @Override
    public ServiceOwnerDTO save(ServiceOwnerDTO serviceOwnerDTO) {
        log.debug("Request to save ServiceOwner : {}", serviceOwnerDTO);
        ServiceOwner serviceOwner = serviceOwnerMapper.toEntity(serviceOwnerDTO);
        serviceOwner = serviceOwnerRepository.save(serviceOwner);
        return serviceOwnerMapper.toDto(serviceOwner);
    }

    @Override
    public Optional<ServiceOwnerDTO> partialUpdate(ServiceOwnerDTO serviceOwnerDTO) {
        log.debug("Request to partially update ServiceOwner : {}", serviceOwnerDTO);

        return serviceOwnerRepository
            .findById(serviceOwnerDTO.getId())
            .map(
                existingServiceOwner -> {
                    serviceOwnerMapper.partialUpdate(existingServiceOwner, serviceOwnerDTO);

                    return existingServiceOwner;
                }
            )
            .map(serviceOwnerRepository::save)
            .map(serviceOwnerMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ServiceOwnerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ServiceOwners");
        return serviceOwnerRepository.findAll(pageable).map(serviceOwnerMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ServiceOwnerDTO> findOne(Long id) {
        log.debug("Request to get ServiceOwner : {}", id);
        return serviceOwnerRepository.findById(id).map(serviceOwnerMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceOwner : {}", id);
        serviceOwnerRepository.deleteById(id);
    }
}
