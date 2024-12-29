import jwt from 'jsonwebtoken'

const verifyToken = (req,res,next)=>{
    const token = req.cookies.accessToken
    console.log(token);
    if(!token) {
        return res.status(401)
        .json({success:false, msg:"Access denied. you're not authorize"})

    }
    // if token exist
    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        // if(err){
        //    return res.status(401).json({success:false, message:"token is invalid"})
        // }
     req.user=user
        next()
    });
};

export const verifyUser=(req,res, next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.body.userID || req.user.role === 'admin')
            {
                console.log(req.user.id);
                console.log(req.body.userID);
            next();
    }else{
        res.status(401)
        .json({success:false, message:"You're not authorize to access"})
    }
    });
}

// export const verifyUser =(req,res,next)=>{
//     verifyToken(req,res,next,()=>{
//         if(req.user.id === req.params.id || req.user.role ==='admin'){
//             next()
//         }else{
//           return  res.status(401).json({success:false,msg:"you're not authenticated"}) 
//         }
//     })
// }

export const verifyAdmin =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if( req.user.role ==='admin'){
            next()
        }else{
          return  res.status(401).json({success:false,msg:"you're not authorize"}) 
        }
    })
}