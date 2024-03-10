
const isAuth = (req, res, next) => {
    if(req.session.isAuth){
        next()
    }else{
        res.redirect('/auth')
    }
};


module.exports = isAuth;
