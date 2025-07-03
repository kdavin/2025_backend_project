module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      c_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      c_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "companys",
    }
  );
  Company.associate = function (models) {
    Company.hasOne(models.User, {
      foreignKey: "companyId",
      as: "user",
    });
    Company.hasMany(models.Product, {
      foreignKey: "companyId",
      as: "products",
    });
  };
  return Company;
};
