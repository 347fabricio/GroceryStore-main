package org.catatau.GroceryStore.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.catatau.GroceryStore.controller.exceptions.EntityAlreadyExistsException;
import org.catatau.GroceryStore.model.Product;
import org.catatau.GroceryStore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductService {
	@Autowired
	private ProductRepository repo;

	public List<Product> getAllProducts(Product product) {
		return repo.findAll();
	}

	public Product getProductById(Integer id) {
		return repo.findById(id).orElseThrow(() -> new EntityNotFoundException(
				String.format("Product with ID %d not found.", id)));
	}

	public List<Product> createProducts(List<Product> products) {
		List<Product> savedProducts = new ArrayList<>();
		for (Product product : products) {
			if (product == null)
				continue;

			Optional<Product> existingProductOpt = repo.findByProductNameAndManufacturer(
					product.getProductName(), product.getManufacturer());

			if (existingProductOpt.isPresent())
				throw new EntityAlreadyExistsException("This product already exists.",
						existingProductOpt.get());

			savedProducts.add(repo.save(product));
		}
		return savedProducts;
	}

	public void deleteProduct(Integer id) {
		if (!repo.existsById(id))
			throw new EntityNotFoundException(String.format("Product with ID %d not found.", id));
		repo.deleteById(id);
	}

	public Product updateProduct(Product product) {
		Optional<Product> productOpt = repo.findById(product.getProductId());
		if (!productOpt.isPresent())
			throw new EntityNotFoundException(
					String.format("Product with ID %d not found.", product.getProductId()));

		Product updatedProduct = productOpt.get();
		updatedProduct.setProductName(product.getProductName());
		updatedProduct.setUnitOfMeasurement(product.getUnitOfMeasurement());
		updatedProduct.setUnitPrice(product.getUnitPrice());
		updatedProduct.setQuantity(product.getQuantity());
		updatedProduct.setManufacturer(product.getManufacturer());
		updatedProduct.setPurchaseDate(product.getPurchaseDate());
		updatedProduct.setProductionDate(product.getProductionDate());
		updatedProduct.setExpiresOn(product.getExpiresOn());
		updatedProduct.setDescription(product.getDescription());
		updatedProduct.setProductCategory(product.getProductCategory());

		return repo.save(updatedProduct);
	}
}
