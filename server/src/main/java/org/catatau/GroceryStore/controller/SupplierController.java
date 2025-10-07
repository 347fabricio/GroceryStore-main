package org.catatau.GroceryStore.controller;

import java.util.List;

import org.catatau.GroceryStore.model.Supplier;
import org.catatau.GroceryStore.service.SupplierService;
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
@RequestMapping("/api/supplier")
public class SupplierController {
	@Autowired
	private SupplierService service;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Supplier>> getAllSuppliers() {
		List<Supplier> suppliers = service.getAllSuppliers();
		return suppliers.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(suppliers);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Supplier> getSupplierById(@PathVariable("id") Integer id) {
		return ResponseEntity.ok().body(service.getSupplierById(id));
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Supplier> createSuppliers(@RequestBody Supplier supplier) {
		Supplier newSupplier = service.createSupplier(supplier);
		return ResponseEntity.status(HttpStatus.CREATED).body(newSupplier);
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> deactivateSupplierById(@PathVariable("id") Integer id) {
		service.deactivateSupplierById(id);
		return ResponseEntity.noContent().build();
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Supplier> updateSupplier(@Valid @RequestBody Supplier supplier) {
		Supplier updatedSupplier = service.updateSupplier(supplier);
		return ResponseEntity.ok(updatedSupplier);
	}
}
