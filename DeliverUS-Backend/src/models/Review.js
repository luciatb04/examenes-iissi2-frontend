import { Model } from 'sequelize'

const loadModel = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate (models) {
      Review.belongsTo(models.User, { foreignKey: 'customerId', as: 'customer' })
      Review.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' })
    }
  }

  Review.init({
    stars: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    body: DataTypes.TEXT,
    customerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    restaurantId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Restaurants',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'Review'
  })

  return Review
}

export default loadModel
