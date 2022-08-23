const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dificulty: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
          },
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.ENUM,
        values: ['Spring', 'Summer', 'Autumn', 'Winter', 'All year']
      },
    },
    {
      timestamps: false,
    }
  );
};
