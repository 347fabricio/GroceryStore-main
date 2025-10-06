package org.catatau.GroceryStore.controller;

import java.util.List;

import org.catatau.GroceryStore.model.Product;
import org.catatau.GroceryStore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping("/api/product")
public class ProductController {
	@Autowired
	private ProductService service;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Product>> getAllProducts(Product product) {
		List<Product> products = service.getAllProducts(product);
		return products.isEmpty() ? ResponseEntity.noContent().build()
				: ResponseEntity.ok(products);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Product> getProductsById(@PathVariable("id") Integer id) {
		Product product = service.getProductById(id);
		return ResponseEntity.ok().body(product);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<List<Product>> createProducts(
			@RequestBody List<@Valid Product> products) {
		List<Product> newProducts = service.createProducts(products);
		return ResponseEntity.status(HttpStatus.CREATED).body(newProducts);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deleteProduct(@PathVariable("id") Integer id) {
		service.deleteProduct(id);
		return ResponseEntity.noContent().build();
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Product> updateProduct(@Valid @RequestBody Product product) {
		if (product == null || product.getProductId() == null)
			return ResponseEntity.badRequest().build();
		Product updatedProduct = service.updateProduct(product);
		return ResponseEntity.ok(updatedProduct);
	}
}
