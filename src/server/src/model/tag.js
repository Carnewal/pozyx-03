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
    iconColor: DataTypes.STRING,
  },
  {
    classMethods: {
      associate: function(models) {
        Tag.belongsTo(models.Map, {as: 'map', foreignKey: 'mapId', targetKey: 'id'})
        Tag.belongsToMany(models.Label, {through: models.TagLabel, foreignKey: 'tagId', as: 'labels'})
        Tag.hasMany(models.Position, {as: 'positions', foreignKey: 'tagId'})
      }
    },
    instanceMethods: {
      toJSON: function() {
        const json = Object.assign({}, this.get())
        json.position = json.positions && json.positions.length > 0
          ? json.positions[0]
          : null
        delete json.positions
        return json
      },
      toIntervalJSON: function(b, e) {
        return {
          tagId: this.id,
          interval: {
            begin: b,
            end: e
          },
          positions: this.positions
        }
      }
    }
  })
  return Tag
}
