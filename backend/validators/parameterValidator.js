const { body, validationResult } = require('express-validator');

const validateParameter = [
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('inputType').isString().notEmpty().withMessage('Input type is required'),
  body('shiftTime')
    .isString()
    .isIn(['Beginning', 'Middle', 'End'])
    .withMessage('Shift time must be Beginning, Middle, or End'),
  body('unit').notEmpty().isString().withMessage('Unit must be a string'),
  body('options')
    .optional()
    .isArray()
    .withMessage('Options must be an array of strings'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateParameter };
