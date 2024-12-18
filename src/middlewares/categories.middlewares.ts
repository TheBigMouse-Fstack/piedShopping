import { checkSchema, ParamSchema } from 'express-validator'
import { CATEGORIES_MESSAGE } from '~/constants/messages'
import { validate } from '~/utils/validation'

const nameCategorySchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORIES_MESSAGE.CATEGORY_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: CATEGORIES_MESSAGE.CATEGORY_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: CATEGORIES_MESSAGE.CREATE_NAME_LENGTH_MUST_BE_LESS_THAN_100
  }
}

export const descSchema: ParamSchema = {
  notEmpty: {
    errorMessage: CATEGORIES_MESSAGE.DESCRIPTION_IS_REQUIRED
  },
  isString: {
    errorMessage: CATEGORIES_MESSAGE.DESCRIPTION_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 300
    },
    errorMessage: CATEGORIES_MESSAGE.DESCRIPTION_LENGTH_MUST_BE_LESS_THAN_300
  }
}

export const createCategoriesValidator = validate(
  checkSchema(
    {
      name: nameCategorySchema,
      description: descSchema
    },
    ['body']
  )
)
