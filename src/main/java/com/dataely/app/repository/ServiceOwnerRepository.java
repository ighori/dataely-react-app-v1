package com.dataely.app.repository;

import com.dataely.app.domain.ServiceOwner;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ServiceOwner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceOwnerRepository extends JpaRepository<ServiceOwner, Long> {}
