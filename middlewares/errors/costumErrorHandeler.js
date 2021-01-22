const CustomError = require('../../helpers/error/CostumError')
const costumErrorHandler = (err, req, res, next) => {
    let customError = err;
    
    console.log(err);

    if (err.name === "SyntaxError") {
        custumError = new CustomError("SyntaxError",400);
    }
    if (err.name === "ValidationError") {
        customError = new CustomError(err.message, 400);
    }
    if (err.name === "CastError") {
        customError = new CustomError("please provide a valid id", 400);
    }
    if (err.code === 11000) {
        //dublicate key
        customError = new CustomError("Dublicate Key Found: Check your input ",400)
    }
    // console.log(costumError.message, customError.status);
    res
        .status(customError.status || 500)
        .json({
            success: false,
            message: customError.message || "Internal Server Error"
        });
    
};
module.exports = {
    costumErrorHandler
};