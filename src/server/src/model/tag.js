module.exports = function(sequelize, DataTypes) {
  const Tag = sequelize.define("Tag", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    hardwareVersion: DataTypes.INTEGER,
    firmwareVersion: DataTypes.INTEGER,
    battery: DataTypes.DOUBLE,
    updateRate: DataTypes.DOUBLE,
    iconNumber: DataTypes.INTEGER,
    iconColor: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsTo(models.Map, {as: 'map'})
        Tag.belongsToMany(models.Label, {through: 'TagLabels'})
      }
    }
  })
  return Tag
}
