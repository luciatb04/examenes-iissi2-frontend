// This is a new file for solution!
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Performances', {
      // TO-DO: You must insert the following fields in Performances table:
      // id (PK integer) si
      // group (string)
      // appointment (date) su
      // restaurantId (FK integer referencing 'id' in Restaurants table)
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group: {
        allowNull: false,
        type: Sequelize.STRING
      },
      appointment: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      restaurantId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Restaurants'
          },
          key: 'id'
        }
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Performances')
  }
}
