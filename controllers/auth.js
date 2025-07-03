const models = require("../models");
const {Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { generateAccessToken } = require("../utils/token");

const register = async (req, res) => {
  const { email, name, password, role } = req.body;
  // password 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  const isuser = await models.User.findOne({
    where: { 
      [Op.and]:
      [{email: email},
      {role:role}]
    },
  });
  // 2. 사용자가 있으면 잘못된 이메일 비밀번호라고 알려줌
  if (isuser) {
    return res.status(400).json({ message: "이미 가입된 유저입니다." });
  }
  const user = await models.User.create({
    email: email,
    name: name,
    password: hashedPassword,
    role: role,
  });
  res.status(201).json({ message: "ok", data: user });
};

const login = async (req, res) => {
  const { email, password,role } = req.body;
  // 1. 이메일로 사용자가 있는지 확인
  const user = await models.User.findOne({
    where: { 
      [Op.and]:
      [{email: email},
      {role:role}]
    },
  });
  // 2. 사용자가 없으면 잘못된 이메일 비밀번호라고 알려줌
  if (!user) {
    return res.status(400).json({ message: "사용자가 없습니다." });
  }
  // 3. 사용자가 있으면 비밀번호 비교
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    // 비밀번호가 일치하지 않으면 사용자에게 노티
    return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  // 4. 정당한 사용자(이메일과 비밀번호가 일치하면) 임시허가증 발급
  const accessToken = generateAccessToken(user);
  res.json({ message: "ok", accessToken: accessToken, user });
  
};

module.exports = {
  register,
  login,
};
