const onlyStore = (req, res, next) =>{
    // console.log(req.user)
    if (req.user.role != "store"){
        return res.status(403).json({ message: "판매자만 접근 가능" });
    }
    next();
}

module.exports = {
  onlyStore,
};
