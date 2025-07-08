package com.assetmanagement.config;

import com.assetmanagement.entity.AssetCategory;
import com.assetmanagement.entity.AssetStatus;
import com.assetmanagement.repository.AssetCategoryRepository;
import com.assetmanagement.repository.AssetStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AssetCategoryRepository categoryRepository;

    @Autowired
    private AssetStatusRepository statusRepository;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Initialize categories if they don't exist
            if (categoryRepository.count() == 0) {
                System.out.println("Initializing categories...");
                categoryRepository.save(new AssetCategory("Laptop"));
                categoryRepository.save(new AssetCategory("Phone"));
                categoryRepository.save(new AssetCategory("Bike"));
                categoryRepository.save(new AssetCategory("Furniture"));
                categoryRepository.save(new AssetCategory("Electronics"));
                categoryRepository.save(new AssetCategory("Vehicle"));
                System.out.println("Categories initialized successfully!");
            }

            // Initialize statuses if they don't exist
            if (statusRepository.count() == 0) {
                System.out.println("Initializing statuses...");
                statusRepository.save(new AssetStatus("Active"));
                statusRepository.save(new AssetStatus("Sold"));
                statusRepository.save(new AssetStatus("Discarded"));
                statusRepository.save(new AssetStatus("Under Repair"));
                System.out.println("Statuses initialized successfully!");
            }

            System.out.println("Data initialization completed!");
        } catch (Exception e) {
            System.err.println("Error during data initialization: " + e.getMessage());
            e.printStackTrace();
        }
    }
}