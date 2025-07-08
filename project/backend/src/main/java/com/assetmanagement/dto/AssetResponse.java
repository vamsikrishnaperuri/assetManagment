package com.assetmanagement.dto;

import com.assetmanagement.entity.Asset;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AssetResponse {
    private Long id;
    private Long userId;
    private String assetName;
    private Long categoryId;
    private Long statusId;
    private LocalDate purchaseDate;
    private LocalDate warrantyExpiryDate;
    private String assetImageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private CategoryResponse category;
    private StatusResponse status;

    // Constructors
    public AssetResponse() {}

    public AssetResponse(Asset asset) {
        this.id = asset.getId();
        this.userId = asset.getUser().getId();
        this.assetName = asset.getAssetName();
        this.categoryId = asset.getCategory().getId();
        this.statusId = asset.getStatus().getId();
        this.purchaseDate = asset.getPurchaseDate();
        this.warrantyExpiryDate = asset.getWarrantyExpiryDate();
        this.assetImageUrl = asset.getAssetImageUrl();
        this.createdAt = asset.getCreatedAt();
        this.updatedAt = asset.getUpdatedAt();
        this.category = new CategoryResponse(asset.getCategory());
        this.status = new StatusResponse(asset.getStatus());
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getStatusId() {
        return statusId;
    }

    public void setStatusId(Long statusId) {
        this.statusId = statusId;
    }

    public LocalDate getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDate purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public LocalDate getWarrantyExpiryDate() {
        return warrantyExpiryDate;
    }

    public void setWarrantyExpiryDate(LocalDate warrantyExpiryDate) {
        this.warrantyExpiryDate = warrantyExpiryDate;
    }

    public String getAssetImageUrl() {
        return assetImageUrl;
    }

    public void setAssetImageUrl(String assetImageUrl) {
        this.assetImageUrl = assetImageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public CategoryResponse getCategory() {
        return category;
    }

    public void setCategory(CategoryResponse category) {
        this.category = category;
    }

    public StatusResponse getStatus() {
        return status;
    }

    public void setStatus(StatusResponse status) {
        this.status = status;
    }

    // Inner classes for category and status
    public static class CategoryResponse {
        private Long id;
        private String categoryName;

        public CategoryResponse() {}

        public CategoryResponse(com.assetmanagement.entity.AssetCategory category) {
            this.id = category.getId();
            this.categoryName = category.getCategoryName();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getCategoryName() {
            return categoryName;
        }

        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }
    }

    public static class StatusResponse {
        private Long id;
        private String statusName;

        public StatusResponse() {}

        public StatusResponse(com.assetmanagement.entity.AssetStatus status) {
            this.id = status.getId();
            this.statusName = status.getStatusName();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getStatusName() {
            return statusName;
        }

        public void setStatusName(String statusName) {
            this.statusName = statusName;
        }
    }
}