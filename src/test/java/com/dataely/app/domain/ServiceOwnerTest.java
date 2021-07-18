package com.dataely.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.dataely.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ServiceOwnerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceOwner.class);
        ServiceOwner serviceOwner1 = new ServiceOwner();
        serviceOwner1.setId(1L);
        ServiceOwner serviceOwner2 = new ServiceOwner();
        serviceOwner2.setId(serviceOwner1.getId());
        assertThat(serviceOwner1).isEqualTo(serviceOwner2);
        serviceOwner2.setId(2L);
        assertThat(serviceOwner1).isNotEqualTo(serviceOwner2);
        serviceOwner1.setId(null);
        assertThat(serviceOwner1).isNotEqualTo(serviceOwner2);
    }
}
