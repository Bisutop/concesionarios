package com.concesionario.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Coche.
 */
@Entity
@Table(name = "coche")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Coche implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "matricula", nullable = false, unique = true)
    private String matricula;

    @NotNull
    @Column(name = "color", nullable = false)
    private String color;

    @NotNull
    @Column(name = "anyo", nullable = false)
    private Integer anyo;

    @NotNull
    @Column(name = "potencia", nullable = false)
    private Double potencia;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "marca" }, allowSetters = true)
    private Modelo modelo;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Coche id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public Coche matricula(String matricula) {
        this.setMatricula(matricula);
        return this;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public String getColor() {
        return this.color;
    }

    public Coche color(String color) {
        this.setColor(color);
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getAnyo() {
        return this.anyo;
    }

    public Coche anyo(Integer anyo) {
        this.setAnyo(anyo);
        return this;
    }

    public void setAnyo(Integer anyo) {
        this.anyo = anyo;
    }

    public Double getPotencia() {
        return this.potencia;
    }

    public Coche potencia(Double potencia) {
        this.setPotencia(potencia);
        return this;
    }

    public void setPotencia(Double potencia) {
        this.potencia = potencia;
    }

    public Modelo getModelo() {
        return this.modelo;
    }

    public void setModelo(Modelo modelo) {
        this.modelo = modelo;
    }

    public Coche modelo(Modelo modelo) {
        this.setModelo(modelo);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Coche)) {
            return false;
        }
        return id != null && id.equals(((Coche) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Coche{" +
            "id=" + getId() +
            ", matricula='" + getMatricula() + "'" +
            ", color='" + getColor() + "'" +
            ", anyo=" + getAnyo() +
            ", potencia=" + getPotencia() +
            "}";
    }
}