package org.catatau.GroceryStore.service.exceptions;

public class EntityAlreadyExistsException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private final Object existingEntity;

    public EntityAlreadyExistsException(String message, Object existingEntity) {
        super(message);
        this.existingEntity = existingEntity;
    }

    public Object getExistingEntity() {
        return existingEntity;
    }
}
