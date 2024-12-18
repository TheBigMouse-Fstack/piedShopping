import { CreateProductReqBody, getAllProductsByPageReqParams } from '~/models/requests/products.request'
import databaseServices from './database.services'
import Product from '~/models/schemas/Product.schema'
import { ObjectId } from 'mongodb'
import ProductMedia from '~/models/schemas/ProductMedia.schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { PRODUCTS_MESSAGE } from '~/constants/messages'
class ProductsServices {
  async createProduct(productInfor: CreateProductReqBody) {
    const { medias, ...product } = productInfor
    const result = await databaseServices.products.insertOne(
      new Product({
        ...product,
        brand_id: new ObjectId(product.brand_id),
        category_id: new ObjectId(product.category_id),
        ship_category_id: new ObjectId(product.ship_category_id)
      })
    )
    const product_id = result.insertedId
    //Mapping
    const mediaProduct = medias.map((media) => ({
      product_id,
      media: media
    })) as ProductMedia[]
    await databaseServices.productMedias.insertMany(mediaProduct)
    return result
  }

  async getProductById(product_id: string) {
    const products = await databaseServices.products
      .aggregate([
        {
          $match: {
            _id: new ObjectId(product_id)
          }
        },
        {
          $lookup: {
            from: 'product_medias',
            localField: '_id',
            foreignField: 'product_id',
            as: 'medias_info'
          }
        },
        {
          $project: {
            medias: {
              $map: {
                input: '$medias_info',
                as: 'media',
                in: '$$media.media'
              }
            },
            _id: 1,
            name: 1,
            quantity: 1,
            price: 1,
            rating_number: 1,
            volume: 1,
            weight: 1,
            height: 1,
            width: 1,
            sold: 1,
            status: 1,
            brand_id: 1,
            category_id: 1,
            ship_category_id: 1,
            description: 1,
            origin: 1
          }
        }
      ])
      .toArray()
    if (products.length === 0) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: PRODUCTS_MESSAGE.PRODUCT_NOT_FOUND
      })
    }
    return products[0]
  }

  async getAllProductsByPage({ page, limit }: { page: number; limit: number }) {
    const products = await databaseServices.products
      .aggregate([
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        },
        {
          $lookup: {
            from: 'product_medias',
            localField: '_id',
            foreignField: 'product_id',
            as: 'medias_info'
          }
        },
        {
          $project: {
            medias: {
              $map: {
                input: '$medias_info',
                as: 'media',
                in: '$$media.media'
              }
            },
            _id: 1,
            name: 1,
            quantity: 1,
            price: 1,
            rating_number: 1,
            volume: 1,
            weight: 1,
            height: 1,
            width: 1,
            sold: 1,
            status: 1,
            brand_id: 1,
            category_id: 1,
            ship_category_id: 1,
            description: 1,
            origin: 1
          }
        }
      ])
      .toArray()
    if (products.length === 0) {
      throw new ErrorWithStatus({
        status: HTTP_STATUS.NOT_FOUND,
        message: PRODUCTS_MESSAGE.PRODUCT_NOT_FOUND
      })
    }
    return products
  }
}
const productsServices = new ProductsServices()
export default productsServices
