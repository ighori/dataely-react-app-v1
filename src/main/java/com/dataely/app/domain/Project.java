package com.dataely.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Project.
 */
@Entity
@Table(name = "project")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Project implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "detail")
    private String detail;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "last_updated")
    private Instant lastUpdated;

    @OneToMany(mappedBy = "project")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "serviceOwner", "project" }, allowSetters = true)
    private Set<Environment> environments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "projects", "organization" }, allowSetters = true)
    private BusinessUnit businessUnit;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project id(Long id) {
        this.id = id;
        return this;
    }

    public String getCode() {
        return this.code;
    }

    public Project code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public Project name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return this.detail;
    }

    public Project detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public Project creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getLastUpdated() {
        return this.lastUpdated;
    }

    public Project lastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
        return this;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Set<Environment> getEnvironments() {
        return this.environments;
    }

    public Project environments(Set<Environment> environments) {
        this.setEnvironments(environments);
        return this;
    }

    public Project addEnvironment(Environment environment) {
        this.environments.add(environment);
        environment.setProject(this);
        return this;
    }

    public Project removeEnvironment(Environment environment) {
        this.environments.remove(environment);
        environment.setProject(null);
        return this;
    }

    public void setEnvironments(Set<Environment> environments) {
        if (this.environments != null) {
            this.environments.forEach(i -> i.setProject(null));
        }
        if (environments != null) {
            environments.forEach(i -> i.setProject(this));
        }
        this.environments = environments;
    }

    public BusinessUnit getBusinessUnit() {
        return this.businessUnit;
    }

    public Project businessUnit(BusinessUnit businessUnit) {
        this.setBusinessUnit(businessUnit);
        return this;
    }

    public void setBusinessUnit(BusinessUnit businessUnit) {
        this.businessUnit = businessUnit;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Project)) {
            return false;
        }
        return id != null && id.equals(((Project) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Project{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", detail='" + getDetail() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
}
