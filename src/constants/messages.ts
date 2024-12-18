export const USERS_MESSAGES = {
  // General
  VALIDATION_ERROR: 'Validation error',
  USER_NOT_FOUND: 'User not found',
  USER_NOT_VERIFIED: 'User not verified',
  EMAIL_NOT_VERIFIED: 'Email not verified',
  USER_IS_NOT_ADMIN: 'User is not admin',

  // Name
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',

  // Email
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_VERIFY_TOKEN_IS_INVALID: 'Email verify token is invalid',
  EMAIL_HAS_BEEN_VERIFIED: 'Email has been verified',
  EMAIL_HAS_BEEN_BANNED: 'Email has been banned',
  VERIFY_EMAIL_SUCCESS: 'Verify email is successfully',
  RESEND_EMAIL_VERIFY_TOKEN_SUCCESS: 'Resend email verify token successfully',

  // Password
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  OLD_PASSWORD_IS_INCORRECT: 'Old password is incorrect',

  // Confirm Password
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',

  // Date of Birth
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',

  // Tokens
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'Forgot password token is invalid',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successfully',

  // User Actions
  LOGIN_SUCCESS: 'Login successfully',
  LOGOUT_SUCCESS: 'Logout successfully',
  REGISTER_SUCCESS: 'Register successfully',
  RESET_PASSWORD_SUCCESS: 'Reset password successfully',
  GET_ME_SUCCESS: 'Get me successfully',
  UPDATE_PROFILE_SUCCESS: 'Update profile success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check Email to reset password',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token successfully',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully',

  // Profile Fields
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 200',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  USERNAME_IS_INVALID:
    'Username must be a string and length must be 4 - 15, and contain only letters, numbers, and underscores, not only numbers',

  // Image URLs
  IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string',
  IMAGE_URL_LENGTH_MUST_BE_LESS_THAN_400: 'Image url length must be less than 400'
} as const

export const BRANDS_MESSAGE = {
  BRAND_NAME_IS_REQUIRED: 'Brand name is required',
  BRAND_NAME_MUST_BE_A_STRING: 'Brand name must be a string',
  CREATE_BRAND_SUCCESS: 'Create brand successfully',
  CREATE_NAME_LENGTH_MUST_BE_LESS_THAN_100: 'Brand name length must be less than 100',
  BRAND_NAME_ALREADY_EXISTS: 'Brand name already exists',
  GET_BRAND_SUCCESS: 'Get brand successfully',
  GET_BRANDS_SUCCESS: 'Get brands successfully',
  UPDATE_BRAND_SUCCESS: 'Update brand successfully',
  DELETE_BRAND_SUCCESS: 'Delete brand successfully',
  HOTLINE_IS_REQUIRED: 'Hotline is required',
  HOTLINE_LENGTH_MUST_BE_FROM_1_TO_12: 'Hotline length must be from 1 to 12',
  HOTLINE_IS_INVALID: 'Hotline is invalid',
  ADDRESS_IS_REQUIRED: 'Address is required',
  ADDRESS_MUST_BE_A_STRING: 'Address must be a string',
  ADDRESS_LENGTH_MUST_BE_LESS_THAN_200: 'Address length must be less than 200',
  GET_BRAND_BY_ID_SUCCESS: 'Get brand by id successfully',
  BRAND_NOT_FOUND: 'Brand not found',
  GET_ALL_BRANDS_SUCCESS: 'Get all brands successfully'
} as const

export const CATEGORIES_MESSAGE = {
  CATEGORY_NAME_IS_REQUIRED: 'Category name is required',
  CATEGORY_NAME_MUST_BE_A_STRING: 'Category name must be a string',
  CREATE_CATEGORY_SUCCESS: 'Create category successfully',
  CREATE_NAME_LENGTH_MUST_BE_LESS_THAN_100: 'Category name length must be less than 100',
  CATEGORY_NAME_ALREADY_EXISTS: 'Category name already exists',
  GET_CATEGORY_SUCCESS: 'Get category successfully',
  GET_CATEGORIES_SUCCESS: 'Get categories successfully',
  UPDATE_CATEGORY_SUCCESS: 'Update category successfully',
  DELETE_CATEGORY_SUCCESS: 'Delete category successfully',
  CATEGORY_NOT_FOUND: 'Category not found',
  GET_ALL_CATEGORIES_SUCCESS: 'Get all categories successfully',
  DESCRIPTION_IS_REQUIRED: 'Description is required',
  DESCRIPTION_MUST_BE_A_STRING: 'Description must be a string',
  DESCRIPTION_LENGTH_MUST_BE_LESS_THAN_300: 'Description length must be less than 300',
  GET_CATEGORY_BY_ID_SUCCESS: 'Get category by id successfully'
} as const
