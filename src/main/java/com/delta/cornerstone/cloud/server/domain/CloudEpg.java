package com.delta.cornerstone.cloud.server.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CloudEpg.
 */
@Entity
@Table(name = "cloud_epg")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CloudEpg implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Lob
    @Column(name = "epg_definition")
    private String epgDefinition;

    @NotNull
    @Column(name = "account_name", nullable = false)
    private String accountName;

    @Lob
    @Column(name = "url_mappings")
    private String urlMappings;

    @Lob
    @Column(name = "graph_info")
    private String graphInfo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public CloudEpg name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public CloudEpg description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEpgDefinition() {
        return epgDefinition;
    }

    public CloudEpg epgDefinition(String epgDefinition) {
        this.epgDefinition = epgDefinition;
        return this;
    }

    public void setEpgDefinition(String epgDefinition) {
        this.epgDefinition = epgDefinition;
    }

    public String getAccountName() {
        return accountName;
    }

    public CloudEpg accountName(String accountName) {
        this.accountName = accountName;
        return this;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public String getUrlMappings() {
        return urlMappings;
    }

    public CloudEpg urlMappings(String urlMappings) {
        this.urlMappings = urlMappings;
        return this;
    }

    public void setUrlMappings(String urlMappings) {
        this.urlMappings = urlMappings;
    }

    public String getGraphInfo() {
        return graphInfo;
    }

    public CloudEpg graphInfo(String graphInfo) {
        this.graphInfo = graphInfo;
        return this;
    }

    public void setGraphInfo(String graphInfo) {
        this.graphInfo = graphInfo;
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
        CloudEpg cloudEpg = (CloudEpg) o;
        if (cloudEpg.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cloudEpg.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CloudEpg{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", epgDefinition='" + getEpgDefinition() + "'" +
            ", accountName='" + getAccountName() + "'" +
            ", urlMappings='" + getUrlMappings() + "'" +
            ", graphInfo='" + getGraphInfo() + "'" +
            "}";
    }
}
