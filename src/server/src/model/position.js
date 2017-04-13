module.exports = function(sequelize, DataTypes) {
  const Position = sequelize.define("Position", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    x: DataTypes.DOUBLE,
    y: DataTypes.DOUBLE,
    z: DataTypes.DOUBLE,
    timestamp: {
      type: DataTypes.DATE(3), //milliseconds
      /*validate: {
        is: /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{3})/
      }*/
    }
  }, {
    classMethods: {
      associate: function(models) {
        Position.belongsTo(models.Tag, {foreignKey: 'tagId', targetKey: 'id', as: 'tag'})
      }
    }
  })
  return Position
}
