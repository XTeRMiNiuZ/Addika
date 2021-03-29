const { body, validationResult } = require('express-validator')
const postValidationRules = () => {
  return [
    body('title')
      .notEmpty().withMessage('Title required')
      .isLength({ min: 5, max: 255 }).withMessage('Must be between 5 to 255 characters'),
    body('description')
      .notEmpty().withMessage('Description required')
      .isLength({ min: 5, max: 255 })
      .withMessage('Must be between 5 to 255 characters'),
    body('content')
      .notEmpty().withMessage('Content required')
      .isLength({ min: 5 })
      .withMessage('Must be at least 5 length'),
  ]
}

const userValidationRules = () => {
  return [
    body('email').isEmail(),
    body('password').trim().notEmpty().withMessage('Password required')
      .isLength({ min: 6 }).withMessage('password must be minimum 6 length')
      .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase')
      .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase')
      .matches(/(?=.*?[0-9])/).withMessage('At least one Number')
      .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character: #?!@$%^&*-')
      .not().matches(/^$|\s+/).withMessage('White space not allowed'),
    // confirm password validation
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both passwords don't match");
      }
      return true;
    })
  ]
}

const reviewValidationRules = () => {
  return [
    body('content')
      .notEmpty().withMessage('Content required')
      .isLength({ min: 5 })
      .withMessage('Must be at least 5 length'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  postValidationRules,
  userValidationRules,
  reviewValidationRules,
  validate,
}