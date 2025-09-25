import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'
import { Sequelize } from 'sequelize'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

const indexOwner = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        where: { userId: req.user.id },
        include: [{
          model: RestaurantCategory,
          as: 'restaurantCategory'
        }]
      })
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

const create = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body)
  newRestaurant.userId = req.user.id // usuario actualmente autenticado
  newRestaurant.pinnedAt = req.body.pinnedAt ? new Date() : null
  try {
    const restaurant = await newRestaurant.save()
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const show = async function (req, res) {
  // Only returns PUBLIC information of restaurants
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
      attributes: { exclude: ['userId'] },
      include: [{
        model: Product,
        as: 'products',
        include: { model: ProductCategory, as: 'productCategory' }
      },
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      }],
      order: [[{ model: Product, as: 'products' }, 'order', 'ASC']]
    }
    )
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

// const _getPinnedRestaurants = async function (req, res) {
//   try {
//     const restaurants = await Restaurant.findAll(
//       {
//         attributes: { exclude: ['userId'] },
//         where: { userId: req.user.id, pinnedAt: { [Sequelize.Op.not]: null } },
//         order: [['pinnedAt', 'ASC']],
//         include: [{
//           model: RestaurantCategory,
//           as: 'restaurantCategory'
//         }]
//       })
//     res.json(restaurants)
//   } catch (err) {
//     res.status(500).send(err)
//   }
// }

// const _getPinnedRestaurants2 = async function (req, res) {
//   try {
//     const pinnedAt = req.body.pinnedAt
//     const restaurants = await Restaurant.findAll(
//       {
//         attributes: { exclude: ['userId'] },
//         where: { userId: req.user.id, pinnedAt },
//         order: [['pinnedAt', 'ASC']],
//         include: [{
//           model: RestaurantCategory,
//           as: 'restaurantCategory'
//         }]
//       })
//     res.json(restaurants)
//   } catch (err) {
//     res.status(500).send(err)
//   }
// }
const update = async function (req, res) {
  try {
    await Restaurant.update(req.body, { where: { id: req.params.restaurantId } })
    const updatedRestaurant = await Restaurant.findByPk(req.params.restaurantId)
    res.json(updatedRestaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const toggledPin = async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    await Restaurant.update({ pinnedAt: restaurant.pinnedAt ? null : new Date() },
      { where: { id: restaurant.id } })
    const updatedRestaurant = await Restaurant.findByPk(req.params.restaurantId)
    res.json(updatedRestaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    const result = await Restaurant.destroy({ where: { id: req.params.restaurantId } })
    let message = ''
    if (result === 1) {
      message = 'Sucessfuly deleted restaurant id.' + req.params.restaurantId
    } else {
      message = 'Could not delete restaurant.'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  indexOwner,
  create,
  toggledPin,
  show,
  update,
  destroy
}
export default RestaurantController
