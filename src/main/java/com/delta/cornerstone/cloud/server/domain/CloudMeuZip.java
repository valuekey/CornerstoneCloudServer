package com.delta.cornerstone.cloud.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CloudMeuZip.
 */
@Entity
@Table(name = "cloud_meu_zip")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CloudMeuZip implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "file_name", nullable = false)
    private String fileName;

    @NotNull
    @Lob
    @Column(name = "zip_file", nullable = false)
    private byte[] zipFile;

    @Column(name = "zip_file_content_type", nullable = false)
    private String zipFileContentType;

    @OneToOne(mappedBy = "cloudMeuZip")
    @JsonIgnore
    private CloudMeu cloudMeu;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public CloudMeuZip fileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getZipFile() {
        return zipFile;
    }

    public CloudMeuZip zipFile(byte[] zipFile) {
        this.zipFile = zipFile;
        return this;
    }

    public void setZipFile(byte[] zipFile) {
        this.zipFile = zipFile;
    }

    public String getZipFileContentType() {
        return zipFileContentType;
    }

    public CloudMeuZip zipFileContentType(String zipFileContentType) {
        this.zipFileContentType = zipFileContentType;
        return this;
    }

    public void setZipFileContentType(String zipFileContentType) {
        this.zipFileContentType = zipFileContentType;
    }

    public CloudMeu getCloudMeu() {
        return cloudMeu;
    }

    public CloudMeuZip cloudMeu(CloudMeu cloudMeu) {
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
        CloudMeuZip cloudMeuZip = (CloudMeuZip) o;
        if (cloudMeuZip.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cloudMeuZip.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CloudMeuZip{" +
            "id=" + getId() +
            ", fileName='" + getFileName() + "'" +
            ", zipFile='" + getZipFile() + "'" +
            ", zipFileContentType='" + getZipFileContentType() + "'" +
            "}";
    }
}
