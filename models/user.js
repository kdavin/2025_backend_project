module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "store", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
    }
  );
  User.associate = function (models) {
    User.hasOne(models.Store, {
      foreignKey: "userId",
      as: "store",
    });
  };
  return User;
};
