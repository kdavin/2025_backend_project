const models = require("../models");

//유저 추가
const createUser = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await models.User.create({
    name,
    email,
    password,
  });
  res.status(201).json({ message: "ok", data: user });
};

//전체 조회
const findAll = async (req, res) => {
  const users = await models.User.findAll();
  res.status(200).json({ message: "ok", data: users });
};

// PUT http://localhost:3000/users/12
//유저 수정
const updateUser = async (req, res) => {
  const { password, name } = req.body;
  const id = req.params.id;
  const user = await models.User.findByPk(id);
  if (user) {
    if (password) user.password = password;
    if (name) user.name = name;
    await user.save();
    res.status(200).json({ message: "ok", data: user });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

//유저 삭제
const deleteUser = async (req, res) => {
  const id = req.params.id;
  const result = await models.User.destroy({ where: { id: id } });
  if (result) {
    res.status(200).json({ message: "ok" });
  } else {
    res.status(404).json({ message: "user not found" });
  }
};
//이메일 기반 찾기
// login에 사용
const findUserByEmail = async (email) => {
  const user = await models.User.findOne({
    where: { email: email },
  });
  return user;
};
module.exports = {
  createUser,
  findAll,
  updateUser,
  deleteUser,
  findUserByEmail,
};
