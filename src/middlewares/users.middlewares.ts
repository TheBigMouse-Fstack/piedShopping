// import các interface build-in của express dể mô tả
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
// middleware la handler giúp kiểm tra dữ liệu mà người dùng truyền lên
// có đủ và đúng như nhu cầu định dạng ko

// giờ ta sẽ phát triển chức năng login
// và cần kiểm tra xem email và password có đủ hay ko?

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  // nếu không có 1 trong 2 thằng email và password thì chữi
  if (!email || !email) {
    res.status(400).json({
      message: 'Missing email or password'
    })
  } else {
    next()
  }
}

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: 'Name is required'
      },
      isString: {
        errorMessage: 'Name must be a string'
      },
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: 'Name must be between 1 and 100 characters'
      }
    },
    email: {
      notEmpty: {
        errorMessage: 'Email is required'
      },
      isEmail: true,
      trim: true
    },
    password: {
      notEmpty: {
        errorMessage: 'Password is required'
      },
      isString: {
        errorMessage: 'Password must be a string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: 'Password must be between 8 and 50 characters'
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      }
    },
    confirm_password: {
      notEmpty: {
        errorMessage: 'confirm_password is required'
      },
      isString: {
        errorMessage: 'confirm_password must be a string'
      },
      isLength: {
        options: {
          min: 8,
          max: 50
        },
        errorMessage: 'confirm_password must be between 8 and 50 characters'
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'confirm_Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('confirm_password must be equal to password')
          } else {
            return true
          }
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
