package com.concesionario.app.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.concesionario.app.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrabajadorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trabajador.class);
        Trabajador trabajador1 = new Trabajador();
        trabajador1.setId(1L);
        Trabajador trabajador2 = new Trabajador();
        trabajador2.setId(trabajador1.getId());
        assertThat(trabajador1).isEqualTo(trabajador2);
        trabajador2.setId(2L);
        assertThat(trabajador1).isNotEqualTo(trabajador2);
        trabajador1.setId(null);
        assertThat(trabajador1).isNotEqualTo(trabajador2);
    }
}
