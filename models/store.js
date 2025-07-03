module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "Store",
    {
      s_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
      },
      s_info: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "stores",
    }
  );
  Store.associate = function (models) {
    Store.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
    Store.hasMany(models.Product, {
      foreignKey: "storeId",
      as: "products",
    });
  };
  return Store;
};
