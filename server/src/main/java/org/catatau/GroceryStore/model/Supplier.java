package org.catatau.GroceryStore.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "suppliers")
@Getter
@Setter
public class Supplier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "supplier_id")
	private Integer id;

	@NotBlank(message = "O nome do fornecedor não pode ser vazio ou nulo.")
	@Size(min = 2, max = 100, message = "O nome do fornecedor deve ter entre 2 e 100 caracteres.")
	private String name;

	@NotBlank(message = "O email do fornecedor não pode ser vazio ou nulo.")
	@Size(min = 6, max = 100, message = "O email do fornecedor deve ter entre 6 e 100 caracteres.")
	private String email;

	@Column(name = "phone_number")
	@NotBlank(message = "O número do fornecedor não pode ser vazio ou nulo.")
	@Size(min = 8, max = 11, message = "O número do fornecedor deve ter entre 8 e 11 caracteres.")
	private String phoneNumber;
	
	@Column(name = "is_active")
	private Boolean isActive;
	
//	public boolean getSupplierActive() {
//		return this.isActive;
//	}
}
