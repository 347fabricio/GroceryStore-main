package org.catatau.GroceryStore.model;

import java.math.BigDecimal;
import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private Integer productId;

	@Column(name = "product_name")
	@NotBlank(message = "O nome do produto não pode ser vazio ou nulo.")
	@Size(min = 2, max = 100, message = "O nome do produto deve ter entre 2 e 100 caracteres.")
	private String productName;

	@Column(name = "unit_of_measurement")
	@NotBlank(message = "A unidade de medida do produto não pode ser vazio ou nulo.")
	@Size(min = 2, max = 64, message = "A unidade de medida do produto deve ter entre 2 e 64 caracteres.")
	private String unitOfMeasurement;

	@Column(name = "unit_price", precision = 10, scale = 2)
	@Positive(message = "O valor do produto deve ser maior do que 0.")
	private BigDecimal unitPrice;

	@Positive(message = "A quantidade do produto deve ser maior do que 0.")
	private Integer quantity;

	@NotBlank(message = "O nome do fabricante não pode ser vazio ou nulo.")
	@Size(min = 2, max = 100, message = "O nome do fabricante deve ter entre 2 e 100 caracteres.")
	private String manufacturer;

	@Column(name = "purchase_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "America/Sao_Paulo")
	@PastOrPresent(message = "A data de compra deve ser no passado ou presente.")
	private Date purchaseDate;

	@Column(name = "production_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "America/Sao_Paulo")
	@PastOrPresent(message = "A data de produção deve ser no passado ou presente.")
	private Date productionDate;

	@Column(name = "expires_on")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy", timezone = "America/Sao_Paulo")
	@Future(message = "A data de validade deve ser no futuro.")
	private Date expiresOn;

	@Size(min = 2, max = 255, message = "A descrição do produto deve ter entre 2 e 255 caracteres.")
	private String description;

	@Column(name = "product_category")
	@NotBlank(message = "A categoria do produto não pode ser vazio ou nulo.")
	@Size(min = 2, max = 100, message = "A categoria do produto deve ter entre 2 e 100 caracteres.")
	private String productCategory;

	@Column(name = "supplier_id")
	@NotNull(message = "O ID do fornecedor não pode ser nulo.")
	private Integer supplierId;
}