import { validationResult } from 'express-validator';
import { apiResponse } from '../utils/apiResponse.js';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(
      apiResponse(false, 'Validation error', null, { errors: errors.array() })
    );
  }
  next();
};
