// This is a new file for solution!
import { check } from 'express-validator'
import { Restaurant } from '../../models/models.js'

const checkRestaurantExists = async (value, { req }) => {
  try {
    const restaurant = await Restaurant.findByPk(req.body.restaurantId)
    if (restaurant === null) {
      return Promise.reject(new Error('The restaurantId does not exist.'))
    } else { return Promise.resolve() }
  } catch (err) {
    return Promise.reject(new Error(err))
  }
}

const create = [
  check('group').exists().isString().isLength({ min: 1, max: 255 }).trim(),
  check('appointment').exists().isDate().toDate(),
  check('restaurantId').exists().isInt({ min: 1 }).toInt(),
  check('restaurantId').custom(checkRestaurantExists)

]

export { create }
