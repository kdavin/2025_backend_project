//모듈 추가
const models = require("../models");
const { Op } = require("sequelize");
//스토어 추가(only store)
const createStore = async (req, res) => {
  const { s_name, s_info } = req.body;
  console.log(s_name);
  console.log(req.user.id);
  const store = await models.Store.create({
    s_name: s_name,
    s_info: s_info,
    userId: req.user.id,
  });
  res
    .status(201)
    .json({ message: "스토어 등록이 완료되었습니다.", data: store });
};

//스토어 전체 조회
const findAll = async (req, res) => {
  const stores = await models.Store.findAll();
  res
    .status(200)
    .json({ message: "전체 스토어 목록을 조회 합니다.", data: stores });
};

//스토어 수정(only store)
const updateStore = async (req, res) => {
  const { s_name, s_info } = req.body;
  const id = req.params.id;
  const store = await models.User.findByPk(id);
  if (store) {
    if (s_name) store.s_name = s_name;
    if (s_info) store.s_info = s_info;
    await store.save();
    res
      .status(200)
      .json({ message: "스토어 수정이 완료되었습니다.", data: store });
  } else {
    res.status(404).json({ message: "스토어가 없습니다." });
  }
};

//스토어 삭제(only store)
const deleteStore = async (req, res) => {
  const id = req.params.id;
  const result = await models.Store.destroy({ where: { id: id } });
  if (result) {
    res.status(200).json({ message: "스토어가 삭제되었습니다." });
  } else {
    res.status(404).json({ message: "스토어가 없습니다." });
  }
};
//스토어 이름 검색
//스토어 검색에 사용
const findStoreByName = async (req, res) => {
  const keyword = req.params.keyword;
  console.log("검색 키워드:", keyword);
  console.log("조건:", { [Op.like]: `%${keyword}%` });
  const stores = await models.Store.findAll({
    where: {
      s_name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });
  //return store;
  console.log(`스토어${stores}`);
  if (stores) {
    res.status(200).json({ message: "스토어 검색 결과 입니다.", data: stores });
  } else {
    res.status(500).json({ message: "스토어가 없습니다.", error });
  }
};
module.exports = {
  createStore,
  findAll,
  updateStore,
  deleteStore,
  findStoreByName,
};
