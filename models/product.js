module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      p_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      p_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "products",
    }
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company",
    });
  };
  return Product;
};
