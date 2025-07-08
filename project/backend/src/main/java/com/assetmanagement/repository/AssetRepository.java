package com.assetmanagement.repository;

import com.assetmanagement.entity.Asset;
import com.assetmanagement.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Page<Asset> findByUser(User user, Pageable pageable);
    Page<Asset> findByUserAndAssetNameContainingIgnoreCase(User user, String assetName, Pageable pageable);
}