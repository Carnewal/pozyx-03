module.exports = function(sequelize, DataTypes) {
  const Label = sequelize.define("Label", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Label.belongsToMany(models.Tag, {through: 'TagLabels'})
      }
    }
  })
  return Label
}