package com.assetmanagement.service;

import com.assetmanagement.entity.AssetCategory;
import com.assetmanagement.entity.AssetStatus;
import com.assetmanagement.repository.AssetCategoryRepository;
import com.assetmanagement.repository.AssetStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class MasterDataService {

    @Autowired
    private AssetCategoryRepository categoryRepository;

    @Autowired
    private AssetStatusRepository statusRepository;

    @Transactional(readOnly = true)
    public List<AssetCategory> getAllCategories() {
        try {
            System.out.println("Service: Fetching all categories from database");
            List<AssetCategory> categories = categoryRepository.findAll();
            System.out.println("Service: Retrieved " + categories.size() + " categories");
            return categories;
        } catch (Exception e) {
            System.err.println("Service error fetching categories: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Transactional(readOnly = true)
    public List<AssetStatus> getAllStatuses() {
        try {
            System.out.println("Service: Fetching all statuses from database");
            List<AssetStatus> statuses = statusRepository.findAll();
            System.out.println("Service: Retrieved " + statuses.size() + " statuses");
            return statuses;
        } catch (Exception e) {
            System.err.println("Service error fetching statuses: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}