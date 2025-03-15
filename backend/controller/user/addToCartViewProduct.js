const addToCartModel = require("../../models/cartProduct")

const addToCartViewProduct = async(req,res)=>{

    try{
        console.log("res user id for view card",req.userId)
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({
            userId : currentUser
        })

        res.json({
            data : allProduct,
            success : true,
            error : false
        })

    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports =  addToCartViewProduct