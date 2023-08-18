const { body, validationResult } = require("express-validator");

const createNameChain = () =>
  body("fullName", "Name must be between 3 to 60 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 3, max: 60 })
    .escape();

const createEmailChain = () =>
  body("email", "Enter a valid email").trim().isEmail().normalizeEmail();

const createMessageChain = () =>
  body("message", "Message must be between 3 to 300 characters")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 5, max: 300 })
    .escape();

const createMinMaxLengthChain = (field, min, max) =>
  body(field, `${field} must be between ${min} to ${max} characters`)
    .trim()
    .notEmpty()
    .isLength({ min, max })
    .escape();

const createOptionalMinMaxLengthChain = (field, min, max) =>
  body(field, `${field} must be between ${min} to ${max} characters`)
    .optional()
    .trim()
    .isLength({ min, max })
    .escape();

const createURLChain = (field) =>
  body(field, `Enter a valid link for ${field}`).trim().notEmpty().isURL();

const createOptionalURLChain = (field) =>
  body(field, `Enter a valid link for ${field}`).optional().trim().isURL();

const createGeneralApplicationChain = () => [
  createNameChain(),
  createEmailChain(),
  createOptionalURLChain("website"),
  createMinMaxLengthChain("city", 3, 30),
  createMinMaxLengthChain("businessDescription", 3, 300),
  createMinMaxLengthChain("founderAndBusinessContact", 3, 300),
  createMinMaxLengthChain("productOrServiceCategory", 3, 300),
  createMinMaxLengthChain("progress", 3, 300),
  createMinMaxLengthChain("businessIdea", 3, 300),
  createMinMaxLengthChain("equityOrFundSharing", 3, 300),
  createMinMaxLengthChain("legal", 3, 300),
  createMinMaxLengthChain("team", 3, 300),
  createOptionalMinMaxLengthChain("others", 3, 300),
  createOptionalMinMaxLengthChain("reference", 3, 300),
  createURLChain("videoPitch"),
  createURLChain("pitchDeck"),
  createMinMaxLengthChain("equity", 3, 300),
];

const handleValidationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let validationErrors = [];
    for (const error of errors.array()) {
      validationErrors.push({ field: error?.path, message: error?.msg });
    }
    return res.status(400).json({
      status: false,
      message: "Oops, something went wrong.",
      errors: validationErrors,
    });
  }
  next();
};

module.exports = {
  createNameChain,
  createEmailChain,
  createMessageChain,
  createGeneralApplicationChain,
  handleValidationError,
  createMinMaxLengthChain,
  createURLChain
};
