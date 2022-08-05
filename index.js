const express = require("express");
const { pt_PT } = require("faker/lib/locales");
const routerApi = require("./routes/indexj");
const {
  logerrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlware/error.Handler");
const app = express();
var cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const port = 3000;

app.use(express.json());
// use it before all route definitions
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("hola mi server en express");
});

routerApi(app);

app.use(logerrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Mi port" + port);
});
