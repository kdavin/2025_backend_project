//1.모듈 추가
// express 사용
const express = require("express");
const app = express();
const path = require("path");
const { logger, logging } = require("./middlewares/logger");
const models = require("./models");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

//2.포트 번호
const PORT = 3000;
//서버에 요청
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

//3.미들웨어 설정
app.use(logging); //로깅 미들웨어
app.use(express.json()); //json 파싱 웨어
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

//4.라우터 추가
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/products");
const storeRouter = require("./routes/stores");

//4.1라우터 사용
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/stores", storeRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//5.에러처리 구문
// app.use((req, res) => {
//   res.status(404).json({
//     status: "Fail",
//     message: "요청한 리소스는 찾을 수 없어요 ",
//   });
// });

// 500 의 경우에도 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: `server error : ${err.stack}`,
  });
});

//6.서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 실행 중입니다.`);
  // DB 연결 <-파일 생성
  models.sequelize
    .sync({ force: false }) // true -> false
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});
