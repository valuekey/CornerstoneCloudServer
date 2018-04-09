package com.delta.cornerstone.cloud.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A CloudMeu.
 */
@Entity
@Table(name = "cloud_meu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CloudMeu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "group_id", nullable = false)
    private String groupId;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "version", nullable = false)
    private String version;

    @Column(name = "jhi_type")
    private String type;

    @NotNull
    @Lob
    @Column(name = "meu_definition", nullable = false)
    private String meuDefinition;

    @OneToOne
    @JoinColumn(unique = true)
    private CloudMeuZip cloudMeuZip;

    @OneToMany(mappedBy = "cloudMeu")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<CloudMeuConfiguration> configurations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupId() {
        return groupId;
    }

    public CloudMeu groupId(String groupId) {
        this.groupId = groupId;
        return this;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getName() {
        return name;
    }

    public CloudMeu name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVersion() {
        return version;
    }

    public CloudMeu version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getType() {
        return type;
    }

    public CloudMeu type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMeuDefinition() {
        return meuDefinition;
    }

    public CloudMeu meuDefinition(String meuDefinition) {
        this.meuDefinition = meuDefinition;
        return this;
    }

    public void setMeuDefinition(String meuDefinition) {
        this.meuDefinition = meuDefinition;
    }

    public CloudMeuZip getCloudMeuZip() {
        return cloudMeuZip;
    }

    public CloudMeu cloudMeuZip(CloudMeuZip cloudMeuZip) {
        this.cloudMeuZip = cloudMeuZip;
        return this;
    }

    public void setCloudMeuZip(CloudMeuZip cloudMeuZip) {
        this.cloudMeuZip = cloudMeuZip;
    }

    public Set<CloudMeuConfiguration> getConfigurations() {
        return configurations;
    }

    public CloudMeu configurations(Set<CloudMeuConfiguration> cloudMeuConfigurations) {
        this.configurations = cloudMeuConfigurations;
        return this;
    }

    public CloudMeu addConfiguration(CloudMeuConfiguration cloudMeuConfiguration) {
        this.configurations.add(cloudMeuConfiguration);
        cloudMeuConfiguration.setCloudMeu(this);
        return this;
    }

    public CloudMeu removeConfiguration(CloudMeuConfiguration cloudMeuConfiguration) {
        this.configurations.remove(cloudMeuConfiguration);
        cloudMeuConfiguration.setCloudMeu(null);
        return this;
    }

    public void setConfigurations(Set<CloudMeuConfiguration> cloudMeuConfigurations) {
        this.configurations = cloudMeuConfigurations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CloudMeu cloudMeu = (CloudMeu) o;
        if (cloudMeu.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cloudMeu.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CloudMeu{" +
            "id=" + getId() +
            ", groupId='" + getGroupId() + "'" +
            ", name='" + getName() + "'" +
            ", version='" + getVersion() + "'" +
            ", type='" + getType() + "'" +
            ", meuDefinition='" + getMeuDefinition() + "'" +
            "}";
    }
}
