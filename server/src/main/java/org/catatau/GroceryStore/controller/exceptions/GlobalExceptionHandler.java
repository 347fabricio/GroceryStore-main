package org.catatau.GroceryStore.controller.exceptions;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.HandlerMethodValidationException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(EntityNotFoundException e,
			HttpServletRequest req) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.NOT_FOUND.value());
		err.setError("EntityNotFoundException: Content not found.");
		err.setMessage(e.getMessage());
		err.setPath(req.getRequestURI());

		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<StandardError> dataIntegrityViolation(DataIntegrityViolationException e,
			HttpServletRequest req) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.CONFLICT.value());
		err.setError("DataIntegrityViolationException: Database constraint violation.");
		err.setMessage(e.getMostSpecificCause().getMessage());
		err.setPath(req.getRequestURI());

		return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<StandardError> argumentNotValidException(
			MethodArgumentNotValidException e, HttpServletRequest req) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("MethodArgumentNotValidException: Validation failed");
		err.setMessage("Invalid product(s)");
		List<String> errors = e.getBindingResult().getFieldErrors().stream()
				.map(error -> String.format("%s: %s", error.getField(), error.getDefaultMessage()))
				.collect(Collectors.toList());
		err.setErrors(errors);
		err.setPath(req.getRequestURI());

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}

	@ExceptionHandler(HandlerMethodValidationException.class)
	public ResponseEntity<StandardError> methodValidationException(
			HandlerMethodValidationException e, HttpServletRequest req) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.BAD_REQUEST.value());
		err.setError("HandlerMethodValidationException: Validation failed");
		err.setMessage("Invalid product(s)");
		List<String> errors = e.getAllErrors().stream().map(error -> {
			String field = "Unknown";
			if (error.getCodes() != null && error.getCodes().length > 0) {
				String[] parts = error.getCodes()[0].split("\\.");
				field = parts[parts.length - 1];
			}
			return String.format("%s: %s", field, error.getDefaultMessage());
		}).collect(Collectors.toList());
		err.setErrors(errors);
		err.setPath(req.getRequestURI());

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}

	@ExceptionHandler(EntityAlreadyExistsException.class)
	public ResponseEntity<StandardError> handleResponseStatus(EntityAlreadyExistsException e,
			HttpServletRequest req) {
		StandardError err = new StandardError();
		err.setTimestamp(Instant.now());
		err.setStatus(HttpStatus.CONFLICT.value());
		err.setMessage(e.getMessage());
		err.setError("EntityExistsException: Content already exists.");
		err.setExisting(e.getExistingEntity());
		err.setPath(req.getRequestURI());

		return ResponseEntity.status(HttpStatus.CONFLICT).body(err);
	}
}
