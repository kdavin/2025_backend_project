//모듈 추가
const models = require("../models");
const { Op } = require("sequelize");
//상품 추가(only company)
const createProduct = async (req, res) => {
  const user = await models.User.findByPk(req.user.id, {
    include: {
      model: models.Store,
      as: "store",
    },
  });
  const storeId = user.store?.id;
  //console.log(storeId)
  if (!storeId) {
    res.status(404).json({ message: "상품이 없습니다." });
  }
  const { p_name, price, p_info, amount } = req.body;
  const product = await models.Product.create({
    p_name,
    price,
    p_info,
    amount,
    storeId: storeId,
  });
  res
    .status(201)
    .json({ message: "상품 등록이 완료되었습니다.", data: product });
};

//상품 전체 조회
const findAll = async (req, res) => {
  const products = await models.Product.findAll();
  res
    .status(200)
    .json({ message: "전체 상품 목록을 조회 합니다.", data: products });
};

//상품 수정(only company)
const updateProduct = async (req, res) => {
  const { p_name, price, p_info, amount } = req.body;
  const id = req.params.id;
  const product = await models.Product.findByPk(id);
  if (product) {
    if (p_name) product.p_name = p_name;
    if (price) product.price = price;
    if (p_info) product.p_info = p_info;
    if (amount) product.p_info = amount;
    await product.save();
    res
      .status(200)
      .json({ message: "상품 수정이 완료되었습니다.", data: product });
  } else {
    res.status(404).json({ message: "상품이 없습니다." });
  }
};

//상품 삭제(only company)
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const result = await models.Product.destroy({ where: { id: id } });
  if (result) {
    res.status(200).json({ message: "상품이 삭제되었습니다." });
  } else {
    res.status(404).json({ message: "상품이 없습니다." });
  }
};
//상품 이름 검색
//상품 검색에 사용
const findProductByName = async (req, res) => {
  const keyword = req.params.keyword;
  const products = await models.Product.findAll({
    where: {
      p_name: {
        [Op.like]: `%${keyword}%`,
      },
    },
  });
  if (products) {
    res.status(200).json({ message: "상품 검색 결과 입니다.", data: products });
  } else {
    res.status(500).json({ message: "상품이 없습니다.", error });
  }
};
module.exports = {
  createProduct,
  findAll,
  updateProduct,
  deleteProduct,
  findProductByName,
};
