package com.dataely.app.domain;

import com.dataely.app.domain.enumeration.EAppType;
import com.dataely.app.domain.enumeration.EEnvPurpose;
import com.dataely.app.domain.enumeration.EEnvType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Environment.
 */
@Entity
@Table(name = "environment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Environment implements Serializable {

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

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "app_type", nullable = false)
    private EAppType appType;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private EEnvType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "purpose", nullable = false)
    private EEnvPurpose purpose;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "last_updated")
    private Instant lastUpdated;

    @ManyToOne
    @JsonIgnoreProperties(value = { "environments" }, allowSetters = true)
    private ServiceOwner serviceOwner;

    @ManyToOne
    @JsonIgnoreProperties(value = { "environments", "businessUnit" }, allowSetters = true)
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Environment id(Long id) {
        this.id = id;
        return this;
    }

    public String getCode() {
        return this.code;
    }

    public Environment code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public Environment name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return this.detail;
    }

    public Environment detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public EAppType getAppType() {
        return this.appType;
    }

    public Environment appType(EAppType appType) {
        this.appType = appType;
        return this;
    }

    public void setAppType(EAppType appType) {
        this.appType = appType;
    }

    public EEnvType getType() {
        return this.type;
    }

    public Environment type(EEnvType type) {
        this.type = type;
        return this;
    }

    public void setType(EEnvType type) {
        this.type = type;
    }

    public EEnvPurpose getPurpose() {
        return this.purpose;
    }

    public Environment purpose(EEnvPurpose purpose) {
        this.purpose = purpose;
        return this;
    }

    public void setPurpose(EEnvPurpose purpose) {
        this.purpose = purpose;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public Environment creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getLastUpdated() {
        return this.lastUpdated;
    }

    public Environment lastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
        return this;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public ServiceOwner getServiceOwner() {
        return this.serviceOwner;
    }

    public Environment serviceOwner(ServiceOwner serviceOwner) {
        this.setServiceOwner(serviceOwner);
        return this;
    }

    public void setServiceOwner(ServiceOwner serviceOwner) {
        this.serviceOwner = serviceOwner;
    }

    public Project getProject() {
        return this.project;
    }

    public Environment project(Project project) {
        this.setProject(project);
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Environment)) {
            return false;
        }
        return id != null && id.equals(((Environment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Environment{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", detail='" + getDetail() + "'" +
            ", appType='" + getAppType() + "'" +
            ", type='" + getType() + "'" +
            ", purpose='" + getPurpose() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
}
