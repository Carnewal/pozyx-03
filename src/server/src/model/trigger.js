module.exports = function(sequelize, DataTypes) {
  const Trigger = sequelize.define("Trigger", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    amountValue: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    objects: DataTypes.STRING,
    filterValue: DataTypes.STRING,
    filter: DataTypes.STRING,
    action: DataTypes.STRING,
    actionMessage: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Trigger.belongsTo(models.Map, {as: 'map', foreignKey: 'mapId', targetKey: 'id'})
      }
    }
  })
  return Trigger
}
