const express = require('express')
const session = require('express-session')
const router  = express.Router()
const Controller = require('../controllers/controller')

//GLOBAL SESSION 
router.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
);


router.get('/tes', (req, res) => {
    req.session.userId = 1;
    res.redirect('/admin')
})

// signup and login
router.get('/', Controller.home)
router.get('/home', Controller.directHome)
router.get('/signup', Controller.signUp)
router.post('/signup', Controller.signUpProcess)
router.get('/login', Controller.login)
router.post('/login', Controller.loginProcess)
router.get('/login/admin', Controller.loginAdmin)
router.post('/login/admin', Controller.loginAdminProcess)

router.use(function (req, res, next) {
    if (!req.session.userId) {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`)
    }
    else {
        next()
    }
})

router.get('/logout', Controller.logout)

// admin session
router.get('/admin', Controller.homeAdmin)
router.post('/admin', Controller.homeAdmin)
router.get('/admin/shoes', Controller.showShoeAdmin)
router.get('/admin/shoes/add', Controller.getAddNewShoe)
router.post('/admin/shoes/add', Controller.postAddNewShoe)
router.get('/admin/shoes/edit/:id', Controller.getEditShoe)
router.post('/admin/shoes/edit/:id', Controller.postEditShoe)
router.get('/admin/shoes/delete/:id',Controller.deleteShoe)
router.get('/admin/categories')
router.get('/admin/categories/add', Controller.getShoeCategories)
router.post('/admin/categories/add', Controller.postShoeCategories)

//shoes session
router.get('/user', Controller.homeUser)
router.get('/shoes', Controller.showShoe)
router.get('/shoes/detail')
router.get('/shoes/buy/:id', Controller.buyShoe)
router.get('/shoes/soldlist', Controller.soldShoe)
router.get('/categories')

module.exports = router;
