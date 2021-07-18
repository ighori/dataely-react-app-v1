package com.dataely.app.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ServiceOwnerMapperTest {

    private ServiceOwnerMapper serviceOwnerMapper;

    @BeforeEach
    public void setUp() {
        serviceOwnerMapper = new ServiceOwnerMapperImpl();
    }
}
