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
        type: DataTypes.ENUM("admin", "company", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
    }
  );
  User.associate = function (models) {
    User.belongsTo(models.Company, {
      foreignKey: "companyId",
      as: "company",
    });
  };
  return User;
};
