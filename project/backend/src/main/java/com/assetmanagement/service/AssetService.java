package com.assetmanagement.service;

import com.assetmanagement.dto.AssetRequest;
import com.assetmanagement.dto.AssetResponse;
import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.AssetCategory;
import com.assetmanagement.entity.AssetStatus;
import com.assetmanagement.entity.User;
import com.assetmanagement.repository.AssetCategoryRepository;
import com.assetmanagement.repository.AssetRepository;
import com.assetmanagement.repository.AssetStatusRepository;
import com.assetmanagement.repository.UserRepository;
import com.assetmanagement.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AssetCategoryRepository categoryRepository;

    @Autowired
    private AssetStatusRepository statusRepository;

    private User getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated()) {
                throw new RuntimeException("User not authenticated");
            }
            
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            User user = userRepository.findById(userDetails.getId())
                    .orElseThrow(() -> new RuntimeException("User not found with ID: " + userDetails.getId()));
            
            System.out.println("Current user: " + user.getUsername() + " (ID: " + user.getId() + ")");
            return user;
        } catch (Exception e) {
            System.err.println("Error getting current user: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to get current user: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public Page<AssetResponse> getUserAssets(Pageable pageable) {
        try {
            User currentUser = getCurrentUser();
            Page<Asset> assets = assetRepository.findByUser(currentUser, pageable);
            return assets.map(AssetResponse::new);
        } catch (Exception e) {
            System.err.println("Error fetching user assets: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public AssetResponse createAsset(AssetRequest request) {
        try {
            User currentUser = getCurrentUser();

            AssetCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + request.getCategoryId()));

            AssetStatus status = statusRepository.findById(request.getStatusId())
                    .orElseThrow(() -> new RuntimeException("Status not found with ID: " + request.getStatusId()));

            Asset asset = new Asset();
            asset.setUser(currentUser);
            asset.setAssetName(request.getAssetName());
            asset.setCategory(category);
            asset.setStatus(status);
            asset.setPurchaseDate(request.getPurchaseDate());
            asset.setWarrantyExpiryDate(request.getWarrantyExpiryDate());
            asset.setAssetImageUrl(request.getAssetImageUrl());

            Asset savedAsset = assetRepository.save(asset);
            System.out.println("Asset saved with ID: " + savedAsset.getId());
            return new AssetResponse(savedAsset);
        } catch (Exception e) {
            System.err.println("Error creating asset: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create asset: " + e.getMessage());
        }
    }

    public AssetResponse updateAsset(Long id, AssetRequest request) {
        try {
            User currentUser = getCurrentUser();

            Asset asset = assetRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

            if (!asset.getUser().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Access denied - asset belongs to different user");
            }

            AssetCategory category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + request.getCategoryId()));

            AssetStatus status = statusRepository.findById(request.getStatusId())
                    .orElseThrow(() -> new RuntimeException("Status not found with ID: " + request.getStatusId()));

            asset.setAssetName(request.getAssetName());
            asset.setCategory(category);
            asset.setStatus(status);
            asset.setPurchaseDate(request.getPurchaseDate());
            asset.setWarrantyExpiryDate(request.getWarrantyExpiryDate());
            asset.setAssetImageUrl(request.getAssetImageUrl());

            Asset savedAsset = assetRepository.save(asset);
            return new AssetResponse(savedAsset);
        } catch (Exception e) {
            System.err.println("Error updating asset: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to update asset: " + e.getMessage());
        }
    }

    public void deleteAsset(Long id) {
        try {
            User currentUser = getCurrentUser();

            Asset asset = assetRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Asset not found with ID: " + id));

            if (!asset.getUser().getId().equals(currentUser.getId())) {
                throw new RuntimeException("Access denied - asset belongs to different user");
            }

            assetRepository.delete(asset);
        } catch (Exception e) {
            System.err.println("Error deleting asset: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to delete asset: " + e.getMessage());
        }
    }
}