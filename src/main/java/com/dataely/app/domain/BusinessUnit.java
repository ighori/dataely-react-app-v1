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
 * A BusinessUnit.
 */
@Entity
@Table(name = "business_unit")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BusinessUnit implements Serializable {

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

    @OneToMany(mappedBy = "businessUnit")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "environments", "businessUnit" }, allowSetters = true)
    private Set<Project> projects = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "user", "businessUnits" }, allowSetters = true)
    private Organization organization;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessUnit id(Long id) {
        this.id = id;
        return this;
    }

    public String getCode() {
        return this.code;
    }

    public BusinessUnit code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public BusinessUnit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return this.detail;
    }

    public BusinessUnit detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public BusinessUnit creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getLastUpdated() {
        return this.lastUpdated;
    }

    public BusinessUnit lastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
        return this;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Set<Project> getProjects() {
        return this.projects;
    }

    public BusinessUnit projects(Set<Project> projects) {
        this.setProjects(projects);
        return this;
    }

    public BusinessUnit addProject(Project project) {
        this.projects.add(project);
        project.setBusinessUnit(this);
        return this;
    }

    public BusinessUnit removeProject(Project project) {
        this.projects.remove(project);
        project.setBusinessUnit(null);
        return this;
    }

    public void setProjects(Set<Project> projects) {
        if (this.projects != null) {
            this.projects.forEach(i -> i.setBusinessUnit(null));
        }
        if (projects != null) {
            projects.forEach(i -> i.setBusinessUnit(this));
        }
        this.projects = projects;
    }

    public Organization getOrganization() {
        return this.organization;
    }

    public BusinessUnit organization(Organization organization) {
        this.setOrganization(organization);
        return this;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BusinessUnit)) {
            return false;
        }
        return id != null && id.equals(((BusinessUnit) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BusinessUnit{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", detail='" + getDetail() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
}
