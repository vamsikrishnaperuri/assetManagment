package com.assetmanagement.controller;

import com.assetmanagement.dto.AssetRequest;
import com.assetmanagement.dto.AssetResponse;
import com.assetmanagement.service.AssetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AssetController {

    @Autowired
    private AssetService assetService;

    @GetMapping
    public ResponseEntity<Page<AssetResponse>> getUserAssets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        try {
            System.out.println("=== Fetching user assets ===");
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            
            Pageable pageable = PageRequest.of(page, size, sort);
            Page<AssetResponse> assets = assetService.getUserAssets(pageable);
            System.out.println("Found " + assets.getTotalElements() + " assets for user");
            return ResponseEntity.ok(assets);
        } catch (Exception e) {
            System.err.println("Error fetching assets: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<AssetResponse> createAsset(@Valid @RequestBody AssetRequest request) {
        try {
            System.out.println("=== Creating new asset ===");
            System.out.println("Asset name: " + request.getAssetName());
            System.out.println("Category ID: " + request.getCategoryId());
            System.out.println("Status ID: " + request.getStatusId());
            
            AssetResponse response = assetService.createAsset(request);
            System.out.println("Asset created successfully with ID: " + response.getId());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Error creating asset: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<AssetResponse> updateAsset(
            @PathVariable Long id, 
            @Valid @RequestBody AssetRequest request) {
        try {
            System.out.println("=== Updating asset with ID: " + id + " ===");
            AssetResponse response = assetService.updateAsset(id, request);
            System.out.println("Asset updated successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            System.err.println("Error updating asset: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsset(@PathVariable Long id) {
        try {
            System.out.println("=== Deleting asset with ID: " + id + " ===");
            assetService.deleteAsset(id);
            System.out.println("Asset deleted successfully");
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            System.err.println("Error deleting asset: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }
}