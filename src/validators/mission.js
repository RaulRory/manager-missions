import Joi from "joi";

export const missionSchema = Joi.object({
  id: Joi.string()
    .uuid()
    .required()
    .messages({
      "any.required": "Mission name is required",
      "string.guid": "ID must be a valid UUID"
    }),

  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.min": "Mission name must be at least 3 characters long",
      "string.max": "Mission name cannot exceed 100 characters",
      "any.required": "Mission name is required"
    }),

  crew: Joi.string()
    .min(2)
    .max(200)
    .required()
    .messages({
      "string.min": "Crew must be at least 2 characters long",
      "string.max": "Crew cannot exceed 200 characters",
      "any.required": "Crew is required"
    }),

  spacecraft: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.min": "Spacecraft must be at least 2 characters long",
      "string.max": "Spacecraft cannot exceed 100 characters",
      "any.required": "Spacecraft is required"
    }),

  destination: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.min": "Destination must be at least 2 characters long",
      "string.max": "Destination cannot exceed 100 characters",
      "any.required": "Destination is required"
    }),

  status: Joi.string()
    .valid("active", "completed", "failed")
    .required()
    .messages({
      "any.only": "Status must be one of: active, completed, failed",
      "any.required": "Status is required"
    }),

  duration: Joi.number()
    .integer()
    .min(1)
    .max(10000)
    .required()
    .messages({
      "number.integer": "Duration must be an integer",
      "number.min": "Duration must be at least 1 day",
      "number.max": "Duration cannot exceed 10000 days",
      "any.required": "Duration is required"
    })
});


export const missionUpdateSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .messages({
      "string.min": "Mission name must be at least 3 characters long",
      "string.max": "Mission name cannot exceed 100 characters",
      "any.required": "Mission name is required"
    }),

  crew: Joi.string()
    .min(2)
    .max(200)
    .messages({
      "string.min": "Crew must be at least 2 characters long",
      "string.max": "Crew cannot exceed 200 characters",
      "any.required": "Crew is required"
    }),

  spacecraft: Joi.string()
    .min(2)
    .max(100)
    .messages({
      "string.min": "Spacecraft must be at least 2 characters long",
      "string.max": "Spacecraft cannot exceed 100 characters",
      "any.required": "Spacecraft is required"
    }),

  destination: Joi.string()
    .min(2)
    .max(100)
    .messages({
      "string.min": "Destination must be at least 2 characters long",
      "string.max": "Destination cannot exceed 100 characters",
      "any.required": "Destination is required"
    }),

  status: Joi.string()
    .valid("active", "completed", "failed")
    .messages({
      "any.only": "Status must be one of: active, completed, failed",
      "any.required": "Status is required"
    }),

  duration: Joi.number()
    .integer()
    .min(1)
    .max(10000)
    .messages({
      "number.integer": "Duration must be an integer",
      "number.min": "Duration must be at least 1 day",
      "number.max": "Duration cannot exceed 10000 days",
      "any.required": "Duration is required"
    })
});

export const validateMission = (data) => {
  const { error, value } = missionSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.message,
      value: detail.context.value
    }));

    return { isValid: false, errors };
  }

  return { isValid: true, data: value };
};

export const validateMissionId = (id) => {
  const idSchema = Joi.string().uuid();

  const { error, value } =  idSchema.validate(id);

  if(error) {
    return { isValid: false, error };
  }

  return { isValid: true, data: value };
};

export const validateMissionUpdate = (data) => {
  const { error, value } = missionUpdateSchema.validate(data, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.message,
      value: detail.context.value
    }));

    return { isValid: false, errors };
  }

  return { isValid: true, data: value };
};
