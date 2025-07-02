module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "company", "user"),
        defaultValue: "user",
      },
    },
    {
      tableName: "users",
    }
  );
  return User;
};
