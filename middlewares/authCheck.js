const config = require('config');
const jsonWebToken = require('jsonwebtoken');

function auth(req, res, next){
    const token = req.cookies.jwt;
    if(token){
        jsonWebToken.verify(token, config.get('jwtKey'), (err, decodeToken) => {
            if(err){
                res.status(400).redirect('/auth/login');
            }else{
                next();
            }
        })
    }else{
        res.status(400).redirect('/auth/login');
    }
}

exports.auth = auth;

