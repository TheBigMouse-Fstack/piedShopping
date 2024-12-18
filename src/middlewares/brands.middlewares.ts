import { checkSchema, ParamSchema } from 'express-validator'
import { BRANDS_MESSAGE } from '~/constants/messages'
import { REGEX_PHONENUMBER } from '~/constants/regex'
import { validate } from '~/utils/validation'

const nameBrandSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGE.BRAND_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGE.BRAND_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: BRANDS_MESSAGE.CREATE_NAME_LENGTH_MUST_BE_LESS_THAN_100
  }
}

const numberPhoneSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGE.HOTLINE_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGE.HOTLINE_LENGTH_MUST_BE_FROM_1_TO_12
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 12
    },
    errorMessage: BRANDS_MESSAGE.HOTLINE_LENGTH_MUST_BE_FROM_1_TO_12
  },
  custom: {
    options: (value, { req }) => {
      return value.match(REGEX_PHONENUMBER)
    },
    errorMessage: BRANDS_MESSAGE.HOTLINE_IS_INVALID
  }
}

const addressSchema: ParamSchema = {
  notEmpty: {
    errorMessage: BRANDS_MESSAGE.ADDRESS_IS_REQUIRED
  },
  isString: {
    errorMessage: BRANDS_MESSAGE.ADDRESS_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 200
    },
    errorMessage: BRANDS_MESSAGE.ADDRESS_LENGTH_MUST_BE_LESS_THAN_200
  }
}

export const createBrandValidator = validate(
  checkSchema(
    {
      name: nameBrandSchema,
      hotline: numberPhoneSchema,
      address: addressSchema
    },
    ['body']
  )
)
