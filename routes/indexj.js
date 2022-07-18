const productsRouter= require("./products.routes");
const servicio= require("./servicios");
const usersRouter= require("./users.routes");
const laboresRouters= require("./labores");

function routerApi(app){
   
app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/servicios", servicio);
app.use("/labores", laboresRouters);

}

module.exports=routerApi;