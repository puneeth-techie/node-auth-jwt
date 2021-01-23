const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users, validateUser } = require('../models/users');

exports.register_get = (req, res, next) => {
    res.render('register');
}

exports.register_post = (req, res, next) => {
    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const { name, email, password } = req.body;
    Users.findOne({email: email}).then(user =>{
        if(user) {
            return res.status(400).send('Email already registered. Please login.');
        }else{
            let user = new Users({ name, email, password });
            bcrypt.genSalt(10, (err, salt) =>{
                if (err) throw err;
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if(err){ 
                        throw err;
                    }else{
                        user.password = hash;
                        user.save().then(user => {
                            const token = user.generateAuthToken();
                            res.cookie('jwt', token, { httpOnly: true, maxAge: 10000 * 60 * 60 * 3});
                            res.status(200).send(user);
                        }).catch(err => res.status(400).send(err));
                    }
                })
            })
        }
    })
}

exports.login_get = (req, res, next) => {
    res.render('login');
}

exports.login_post = (req, res, next) => {
    const { email, password} = req.body;
    Users.findOne({ email: email}).then((user) => {
        const token = user.generateAuthToken();
        res.cookie('jwt', token, { httpOnly: true, maxAge: 10000 * 60 * 60 * 3});
        bcrypt.compare(password, user.password, (err, isMatch) => {
            console.log(isMatch);
            if(isMatch) {
                res.status(200).render('dashboard', {user: user});
            }else{
                res.status(400).redirect('/auth/login');
            }
        })
    }).catch(err => {res.status(400).send(err)});
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
