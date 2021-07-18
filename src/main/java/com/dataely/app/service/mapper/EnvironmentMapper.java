package com.dataely.app.service.mapper;

import com.dataely.app.domain.*;
import com.dataely.app.service.dto.EnvironmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Environment} and its DTO {@link EnvironmentDTO}.
 */
@Mapper(componentModel = "spring", uses = { ServiceOwnerMapper.class, ProjectMapper.class })
public interface EnvironmentMapper extends EntityMapper<EnvironmentDTO, Environment> {
    @Mapping(target = "serviceOwner", source = "serviceOwner", qualifiedByName = "name")
    @Mapping(target = "project", source = "project", qualifiedByName = "name")
    EnvironmentDTO toDto(Environment s);
}
