package org.catatau.GroceryStore.repository;

import java.util.Optional;

import org.catatau.GroceryStore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	Optional<Product> findByProductNameAndManufacturer(String productName, String manufacturer);
}
