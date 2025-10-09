package org.catatau.GroceryStore.service;

import java.util.ArrayList;
import java.util.Comparator;
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
		List<Supplier> suppliers = repo.findAll();
	    suppliers.sort(Comparator.comparing(Supplier::getIsActive).reversed());	
	    
		return suppliers;
	}
	
	public List<Supplier> getSuppliersByPage(String page) {
		System.out.println("Get by page...");
		int pageSize = 10;
		List<Supplier> suppliers = repo.findAll();
		suppliers.sort(Comparator.comparing(Supplier::getIsActive).reversed());	
		
		int fromIndex = Integer.parseInt(page) * pageSize;
		
		if (fromIndex >= suppliers.size()) return new ArrayList<>();
		
		int toIndex = Math.min(fromIndex + pageSize, suppliers.size());
	    
		
		return suppliers.subList(fromIndex, toIndex);
	}

	public Supplier getSupplierById(Integer id) {
		return repo.findById(id).orElseThrow(() -> new EntityNotFoundException(
				String.format("Supplier with ID %d not found.", id)));
	}

	public Supplier createSupplier(Supplier supplier) {
		return repo.save(supplier);
	}

	public void deactivateSupplierById(Integer id) {
		Optional<Supplier> supplierOpt = repo.findById(id);
		if (!supplierOpt.isPresent())
			throw new EntityNotFoundException(String.format("Supplier with ID %d not found.", id));

		Supplier updatedSupplier = supplierOpt.get();
		updatedSupplier.setIsActive(false);
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
		updatedSupplier.setIsActive(supplier.getIsActive());
		return repo.save(updatedSupplier);
	}
}
