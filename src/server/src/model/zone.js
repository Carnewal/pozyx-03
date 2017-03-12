module.exports = function(sequelize, DataTypes) {
  const Zone = sequelize.define("Zone", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    color: DataTypes.STRING,
    polygon: DataTypes.GEOMETRY
  }, {
    classMethods: {
      associate: function(models) {
        Zone.belongsTo(models.Map)
      }
    }
  })
  return Zone
}
