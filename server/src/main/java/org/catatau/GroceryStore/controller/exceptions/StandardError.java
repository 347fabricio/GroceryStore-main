package org.catatau.GroceryStore.controller.exceptions;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StandardError implements Serializable {
	private static final long serialVersionUID = 1L;

	private Instant timestamp;
	private Integer status;
	private String error;
	private String message;
	private Object existing;
	private List<String> errors;
	private String path;
}
