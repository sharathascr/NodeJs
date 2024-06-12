const {constants} =require("../constants");
const errorHandler=(err, req, res, next)=>{
    const statusCode=req.statusCode ? req.statusCode :500;
    console.log(statusCode);

    switch (statusCode){
        case constants.NOT_FOUND:
            res.json({title:"Not Found",message:err.message, stackTrace:err.stack});
            break;
        case constants.VALIDATION_ERR:
            res.json({title:"Validation failed",message:err.message, stackTrace:err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title:"forbidden", message:err.message, stackTrace:err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title:'Unauthorized', message:err.message, stackTrace:err.stack});
            break;
        case constants.SERVER_ERR:
            res.json({title:'server error', message:err.message, stackTrace:err.stack});
            break;
        default:
            console.log('No error!.. All good.. ');
            break;     
    }
}

module.exports=errorHandler;