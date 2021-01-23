exports.home = (req, res, next) => {
    res.render('home');
}

exports.dashboard = (req, res, next) => {
    const user = req.user;
    res.render('dashboard', {user: user} );
}