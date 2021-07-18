package com.dataely.app.service.mapper;

import com.dataely.app.domain.*;
import com.dataely.app.service.dto.ProjectDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Project} and its DTO {@link ProjectDTO}.
 */
@Mapper(componentModel = "spring", uses = { BusinessUnitMapper.class })
public interface ProjectMapper extends EntityMapper<ProjectDTO, Project> {
    @Mapping(target = "businessUnit", source = "businessUnit", qualifiedByName = "name")
    ProjectDTO toDto(Project s);

    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    ProjectDTO toDtoName(Project project);
}
