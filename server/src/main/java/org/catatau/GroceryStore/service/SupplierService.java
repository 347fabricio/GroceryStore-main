package org.catatau.GroceryStore.service;

import java.util.List;
import java.util.Optional;

import org.catatau.GroceryStore.model.Supplier;
import org.catatau.GroceryStore.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SupplierService {
	@Autowired
	private SupplierRepository repo;

	public List<Supplier> getAllSuppliers() {
		return repo.findAll();
	}

	public Supplier getSupplierById(Integer id) {
		return repo.findById(id).orElseThrow(() -> new EntityNotFoundException(
				String.format("Supplier with ID %d not found.", id)));
	}

	public Supplier createSupplier(Supplier supplier) {
		return repo.save(supplier);
	}

	public void deleteSupplier(Integer id) {
		Optional<Supplier> supplierOpt = repo.findById(id);
		if (!supplierOpt.isPresent())
			throw new EntityNotFoundException(String.format("Supplier with ID %d not found.", id));

		Supplier updatedSupplier = supplierOpt.get();
		updatedSupplier.setActive(false);
		repo.save(updatedSupplier);
	}

	public Supplier updateSupplier(Supplier supplier) {
		Optional<Supplier> supplierOpt = repo.findById(supplier.getId());
		if (!supplierOpt.isPresent())
			throw new EntityNotFoundException(
					String.format("Supplier with ID %d not found.", supplier.getId()));

		Supplier updatedSupplier = supplierOpt.get();
		updatedSupplier.setName(supplier.getName());
		updatedSupplier.setEmail(supplier.getEmail());
		updatedSupplier.setPhoneNumber(supplier.getPhoneNumber());
		return repo.save(updatedSupplier);
	}
}
