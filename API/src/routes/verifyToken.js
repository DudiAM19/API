const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 123456789, (err, user) => {
            if(err) res.status(403).json('Token tidak valid');
            req.user = user;
            next();
        })
    } else {
        return res.status(401).json('kamu tidak ter authentifikasi');
    }
};

const verifyTokenAndAuthorization = (req, res,next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }else{
            res.status(403).json('kamu tidak diizinkan melakukan tindakan tersebut');
        }
    })
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json('kamu tidak diizinkan melakukan tindakan tersebut')
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};