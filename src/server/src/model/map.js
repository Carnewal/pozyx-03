module.exports = function(sequelize, DataTypes) {
  const Map = sequelize.define("Map", {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    x: DataTypes.DOUBLE,
    y: DataTypes.DOUBLE,
    z: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        //Map.hasMany(models.Tag, {as: 'tags'})
        //Map.hasMany(models.Anchor, {as: 'anchors'})
        //Map.hasMany(models.Zone, {as: 'zones'})
      }
    }
  })
  return Map
}
