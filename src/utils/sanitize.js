const { body, validationResult } = require('express-validator');

// Common Error Handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation for Single Translate
const validateTranslateSingle = [
  body('text').isString().trim().notEmpty().withMessage('Text is required and must be a non-empty string.'),
  body('toLanguage')
    .isString()
    .isLength({ min: 2, max: 5 })
    .withMessage('toLanguage must be a valid language code.'),
  handleValidationErrors,
];

// Validation for Multiple Translate
const validateTranslateMultiple = [
  body('texts')
    .isArray({ min: 1 })
    .withMessage('Texts must be an array with at least one element.')
    .custom((texts) => texts.every((text) => typeof text === 'string' && text.trim() !== ''))
    .withMessage('Each text in the array must be a non-empty string.'),
  body('toLanguage')
    .isString()
    .isLength({ min: 2, max: 5 })
    .withMessage('toLanguage must be a valid language code.'),
  handleValidationErrors,
];

// Validation for Detect Language
const validateDetectLanguage = [
  body('text').isString().trim().notEmpty().withMessage('Text is required and must be a non-empty string.'),
  handleValidationErrors,
];

module.exports = { validateTranslateSingle, validateTranslateMultiple, validateDetectLanguage };

