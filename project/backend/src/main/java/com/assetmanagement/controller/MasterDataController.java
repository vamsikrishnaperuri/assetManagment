package com.assetmanagement.controller;

import com.assetmanagement.entity.AssetCategory;
import com.assetmanagement.entity.AssetStatus;
import com.assetmanagement.service.MasterDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class MasterDataController {

    @Autowired
    private MasterDataService masterDataService;

    @GetMapping("/categories")
    public ResponseEntity<List<AssetCategory>> getAllCategories() {
        try {
            System.out.println("=== Fetching categories ===");
            List<AssetCategory> categories = masterDataService.getAllCategories();
            System.out.println("Found " + categories.size() + " categories");
            for (AssetCategory category : categories) {
                System.out.println("Category: " + category.getId() + " - " + category.getCategoryName());
            }
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            System.err.println("Error fetching categories: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<AssetStatus>> getAllStatuses() {
        try {
            System.out.println("=== Fetching statuses ===");
            List<AssetStatus> statuses = masterDataService.getAllStatuses();
            System.out.println("Found " + statuses.size() + " statuses");
            for (AssetStatus status : statuses) {
                System.out.println("Status: " + status.getId() + " - " + status.getStatusName());
            }
            return ResponseEntity.ok(statuses);
        } catch (Exception e) {
            System.err.println("Error fetching statuses: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}