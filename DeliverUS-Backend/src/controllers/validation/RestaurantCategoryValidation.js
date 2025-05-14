import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'
const checkCategoryExists = async (value, { req }) => {
  try {
    const category = RestaurantCategory.findOne({
      where: { name: value }
    })
    if (!category) {
      return Promise.resolve('Category succesfully created')
    } else {
      return Promise.reject(new Error('Restaurant category succesfullycreated'))
    }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [

  // El tamaño máximo para los nombres de las categorías de restaurante
  // será de 50 caracteres
  // SOLUCION
  check('name').exists().isString().isLength({ min: 1, max: 50 }).custom(checkCategoryExists)
    .trim()
]
export { create }
