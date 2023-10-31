const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {}
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      notes: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lat: { type: DataTypes.STRING, allowNull: false },
      long: { type: DataTypes.STRING, allowNull: false },
      recordStatus: {
        type: DataTypes.ENUM,
        values: ['LATEST', 'DELETED'],
        defaultValue: 'LATEST',
        allowNull: false,
      },
      ///////////////
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: 1000000,

      sequelize,
      tableName: 'locations',
      freezeTableName: true,
      underscored: true,
    }
  );
  return Location;
};
