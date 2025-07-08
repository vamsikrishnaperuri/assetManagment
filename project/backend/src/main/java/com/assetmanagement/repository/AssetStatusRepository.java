package com.assetmanagement.repository;

import com.assetmanagement.entity.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetStatusRepository extends JpaRepository<AssetStatus, Long> {
}