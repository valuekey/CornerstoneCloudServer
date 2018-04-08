package com.delta.cornerstone.cloud.server.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CloudMeuConfiguration.
 */
@Entity
@Table(name = "cloud_meu_configuration")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CloudMeuConfiguration implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "filename")
    private String filename;

    @Lob
    @Column(name = "content")
    private String content;

    @ManyToOne(optional = false)
    @NotNull
    private CloudMeu cloudMeu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public CloudMeuConfiguration filename(String filename) {
        this.filename = filename;
        return this;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getContent() {
        return content;
    }

    public CloudMeuConfiguration content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public CloudMeu getCloudMeu() {
        return cloudMeu;
    }

    public CloudMeuConfiguration cloudMeu(CloudMeu cloudMeu) {
        this.cloudMeu = cloudMeu;
        return this;
    }

    public void setCloudMeu(CloudMeu cloudMeu) {
        this.cloudMeu = cloudMeu;
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
        CloudMeuConfiguration cloudMeuConfiguration = (CloudMeuConfiguration) o;
        if (cloudMeuConfiguration.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cloudMeuConfiguration.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CloudMeuConfiguration{" +
            "id=" + getId() +
            ", filename='" + getFilename() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
