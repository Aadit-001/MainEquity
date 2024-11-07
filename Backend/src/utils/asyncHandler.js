const asyncHandler = (requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}

export default asyncHandler











//the commeneted and the non commented parts are the same just the way of righting is different

// const asyncHandler = (fun) => async (req,res,next) => {
//     try{
//         await fun(req,res,next)
//     }catch(error){
//         res.status(error.code || 500).json({
//           success: false,
//           message: error.message  
//         })
//     }
// }