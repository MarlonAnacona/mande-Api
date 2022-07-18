
function logerrors(err,req,res,next){
console.error(err)
next(err)
}

function errorHandler(err,req,res,next){
    console.log("errorHandler")
res.status(500).json({
    message:err.mmessage,
    stack: err.stack,
})    

}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
      const { output } = err;
      res.status(output.statusCode).json(output.payload);
    }
    next(err);
  }

module.exports={logerrors,errorHandler,boomErrorHandler}