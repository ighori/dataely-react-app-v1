package com.dataely.app.service.mapper;

import com.dataely.app.domain.*;
import com.dataely.app.service.dto.ServiceOwnerDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ServiceOwner} and its DTO {@link ServiceOwnerDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceOwnerMapper extends EntityMapper<ServiceOwnerDTO, ServiceOwner> {
    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ServiceOwnerDTO toDtoName(ServiceOwner serviceOwner);
}
