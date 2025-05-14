import { check } from 'express-validator'
import { RestaurantCategory } from '../../models/models.js'
const checkCategoryExists = async (value, { req }) => {
  try {
    const category = await RestaurantCategory.findOne({
      where: { name: value }
    })
    if (category !== null) {
      return Promise.reject(new Error('Category already exists'))
    }
    return Promise.resolve('Restaurant category created')
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

