const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Reading = sequelize.define('Reading', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // This is the table name for the User model
      key: 'id'
    }
  },
  glucoseLevel: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false
  }
}, {
  tableName: 'Readings',
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = { Reading };
