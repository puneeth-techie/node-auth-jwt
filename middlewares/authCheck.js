const { Users } = require('../models/users');
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

function checkUser(req, res, next){
    const token = req.cookies.jwt;
    if(token){
        jsonWebToken.verify(token, config.get('jwtKey'), async (err, decodeToken) => {
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await Users.findById(decodeToken.id);
                res.locals.user = user;
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

exports.auth = auth;
exports.checkUser = checkUser;

