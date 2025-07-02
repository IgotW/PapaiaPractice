const Joi = require("joi"); // For validation

// Define validation schema using Joi
const userValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Please add a username",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Please add an email",
  }),
  phoneNumber: Joi.string().required().messages({
    "string.empty": "Please add a phone number",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Please add a password",
  }),
  firstName: Joi.string().required().messages({
    "string.empty": "Please add a first name",
  }),
  middleName: Joi.string().allow("").default(""),
  lastName: Joi.string().required().messages({
    "string.empty": "Please add a last name",
  }),
  suffix: Joi.string().allow("").default(""),
  birthdate: Joi.date().required().messages({
    "date.base": "Please add a birthdate",
  }),
  gender: Joi.string().valid("Male", "Female").default("Male").required(),
  purok: Joi.string().required().messages({
    "string.empty": "Please add a purok",
  }),
  street: Joi.string().required().messages({
    "string.empty": "Please add a street",
  }),
  barangay: Joi.string().required().messages({
    "string.empty": "Please add a barangay",
  }),
  municipality: Joi.string().required().messages({
    "string.empty": "Please add a municipality",
  }),
  province: Joi.string().required().messages({
    "string.empty": "Please add a province",
  }),
  zipCode: Joi.string().required().messages({
    "string.empty": "Please add a zip code",
  }),
  role: Joi.string().valid("user", "admin").default("user"),
  emailVerified: Joi.boolean().default(false),
  verificationToken: Joi.string().allow(null).default(null),
  verifyOtp: Joi.string().allow(null).default(null),
  verifyOtpExpires: Joi.date().allow(null),
  resetOtp: Joi.string().allow(null).default(null),
  resetOtpExpires: Joi.date().allow(null),
  createdAt: Joi.date().default(() => new Date())
});

module.exports = userValidationSchema;
