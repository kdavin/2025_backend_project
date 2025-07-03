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
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
      },
    },
    {
      tableName: "products",
    }
  );
  Product.associate = function (models) {
    Product.belongsTo(models.Store, {
      foreignKey: "storeId",
      as: "store",
    });
  };
  return Product;
};
