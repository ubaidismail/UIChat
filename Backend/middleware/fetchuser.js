var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Ubaid';

const fetchuser = (req,res,next)=>{

    // get user from jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:'Token is not valid'})
    }
    try {
        var data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error:'Token is not valid'})

    }

   

}

module.exports = fetchuser;