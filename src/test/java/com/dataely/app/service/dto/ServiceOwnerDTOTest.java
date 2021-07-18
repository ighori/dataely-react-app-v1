package com.dataely.app.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.dataely.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ServiceOwnerDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceOwnerDTO.class);
        ServiceOwnerDTO serviceOwnerDTO1 = new ServiceOwnerDTO();
        serviceOwnerDTO1.setId(1L);
        ServiceOwnerDTO serviceOwnerDTO2 = new ServiceOwnerDTO();
        assertThat(serviceOwnerDTO1).isNotEqualTo(serviceOwnerDTO2);
        serviceOwnerDTO2.setId(serviceOwnerDTO1.getId());
        assertThat(serviceOwnerDTO1).isEqualTo(serviceOwnerDTO2);
        serviceOwnerDTO2.setId(2L);
        assertThat(serviceOwnerDTO1).isNotEqualTo(serviceOwnerDTO2);
        serviceOwnerDTO1.setId(null);
        assertThat(serviceOwnerDTO1).isNotEqualTo(serviceOwnerDTO2);
    }
}
