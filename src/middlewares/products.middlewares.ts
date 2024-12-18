import { checkSchema, ParamSchema } from 'express-validator'
import { PRODUCTS_MESSAGE } from '~/constants/messages'
import { validate } from '~/utils/validation'
import { descSchema } from './categories.middlewares'
import { ObjectId } from 'mongodb'
import { MediaType } from '~/constants/enums'

const nameProductSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.PRODUCT_NAME_IS_REQUIRED
  },
  isString: {
    errorMessage: PRODUCTS_MESSAGE.PRODUCT_NAME_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: PRODUCTS_MESSAGE.CREATE_NAME_LENGTH_MUST_BE_LESS_THAN_100
  }
}

const quantityProductSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.QUANTITY_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PRODUCTS_MESSAGE.QUANTITY_MUST_BE_A_NUMBER
  },
  custom: {
    options: (value: Number, { req }) => {
      return Number(value) >= 0
    },
    errorMessage: PRODUCTS_MESSAGE.QUANTITY_MUST_BE_GREATER_THAN_0
  }
}

const priceProductSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.PRICE_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PRODUCTS_MESSAGE.PRICE_MUST_BE_A_NUMBER
  },
  custom: {
    options: (value: Number, { req }) => {
      return Number(value) >= 0
    },
    errorMessage: PRODUCTS_MESSAGE.PRICE_MUST_BE_POSITIVE
  }
}

const brand_idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.BRAND_ID_IS_REQUIRED
  },
  isString: {
    errorMessage: PRODUCTS_MESSAGE.BRAND_ID_MUST_BE_A_STRING
  },
  custom: {
    options: (value: string, { req }) => {
      return ObjectId.isValid(value)
    },
    errorMessage: PRODUCTS_MESSAGE.BRAND_ID_MUST_BE_A_VALID_OBJECT_ID
  }
}

const originSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.ORIGIN_IS_REQUIRED
  },
  isString: {
    errorMessage: PRODUCTS_MESSAGE.ORIGIN_MUST_BE_A_STRING
  },
  trim: true,
  isLength: {
    options: {
      min: 1,
      max: 100
    },
    errorMessage: PRODUCTS_MESSAGE.ORIGIN_LENGTH_MUST_BE_LESS_THAN_100
  }
}

const volumeSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.VOLUME_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PRODUCTS_MESSAGE.VOLUME_MUST_BE_A_NUMBER
  },
  custom: {
    options: (value: Number, { req }) => {
      return Number(value) >= 0
    },
    errorMessage: PRODUCTS_MESSAGE.VOLUME_MUST_BE_GREATER_THAN_0
  }
}

const weightSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.WEIGHT_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PRODUCTS_MESSAGE.WEIGHT_MUST_BE_A_NUMBER
  },
  custom: {
    options: (value: Number, { req }) => {
      return Number(value) >= 0
    },
    errorMessage: PRODUCTS_MESSAGE.WEIGHT_MUST_BE_GREATER_THAN_0
  }
}

const heightSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.HEIGHT_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PRODUCTS_MESSAGE.HEIGHT_MUST_BE_A_NUMBER
  },
  custom: {
    options: (value: Number, { req }) => {
      return Number(value) >= 0
    },
    errorMessage: PRODUCTS_MESSAGE.HEIGHT_MUST_BE_GREATER_THAN_0
  }
}

const widthSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.WIDTH_IS_REQUIRED
  },
  isNumeric: {
    errorMessage: PRODUCTS_MESSAGE.WIDTH_MUST_BE_A_NUMBER
  },
  custom: {
    options: (value: Number, { req }) => {
      return Number(value) >= 0
    },
    errorMessage: PRODUCTS_MESSAGE.WIDTH_MUST_BE_GREATER_THAN_0
  }
}

const category_idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.CATEGORY_ID_IS_REQUIRED
  },
  isString: {
    errorMessage: PRODUCTS_MESSAGE.CATEGORY_ID_MUST_BE_A_STRING
  },
  custom: {
    options: (value: string, { req }) => {
      return ObjectId.isValid(value)
    },
    errorMessage: PRODUCTS_MESSAGE.CATEGORY_ID_MUST_BE_A_VALID_OBJECT_ID
  }
}

const ship_category_idSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.SHIP_CATEGORY_ID_IS_REQUIRED
  },
  isString: {
    errorMessage: PRODUCTS_MESSAGE.SHIP_CATEGORY_ID_MUST_BE_A_STRING
  },
  custom: {
    options: (value: string, { req }) => {
      return ObjectId.isValid(value)
    },
    errorMessage: PRODUCTS_MESSAGE.SHIP_CATEGORY_ID_MUST_BE_A_VALID_OBJECT_ID
  }
}

const mediaSchema: ParamSchema = {
  notEmpty: {
    errorMessage: PRODUCTS_MESSAGE.MEDIA_IS_REQUIRED
  },
  isArray: {
    errorMessage: PRODUCTS_MESSAGE.MEDIA_MUST_BE_AN_ARRAY
  },
  custom: {
    options: (value: string[], { req }) => {
      //key
      const mediaTypeArray = Object.keys(MediaType).filter((key) => !isNaN(Number(key)))
      if (
        value.some((item: any) => {
          return typeof item.url !== 'string' || !mediaTypeArray.includes((item.type as number).toString())
        })
      ) {
        throw new Error(PRODUCTS_MESSAGE.MEDIAS_IS_INVALID)
      }
      return true
    }
  }
}

export const createProductValidator = validate(
  checkSchema(
    {
      name: nameProductSchema,
      quantity: quantityProductSchema,
      price: priceProductSchema,
      description: descSchema,
      brand_id: brand_idSchema,
      origin: originSchema,
      volume: volumeSchema,
      weight: weightSchema,
      height: heightSchema,
      width: widthSchema,
      category_id: category_idSchema,
      ship_category_id: ship_category_idSchema,
      medias: mediaSchema
    },
    ['body']
  )
)
