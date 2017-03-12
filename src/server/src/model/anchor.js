module.exports = function(sequelize, DataTypes) {
  const Anchor = sequelize.define("Anchor", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    hardwareVersion: DataTypes.INTEGER,
    firmwareVersion: DataTypes.INTEGER,
    x: DataTypes.DOUBLE,
    y: DataTypes.DOUBLE,
    z: DataTypes.DOUBLE,
    status: DataTypes.INTEGER,
    timestamp: DataTypes.DATE(3)
  }, {
    classMethods: {
      associate: function(models) {
        Anchor.belongsTo(models.Map)
      }
    }
  })
  return Anchor
}
