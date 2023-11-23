// const shoeshascategories = require('../models/shoeshascategorie')
const { Shoe, Shoeshascategorie, Categorie, Profile, User} = require('../models/index')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')

class Controller {
    static async home(req, res) {
        try {
            res.redirect('/home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async directHome(req, res) {
        try {
            res.render('home')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async homeAdmin(req, res) {
        try {
            res.render('homeAdmin')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async homeUser(req, res) {
        try {
            const data = await User.findOne()
            res.render('homeUser', {
                data
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async signUp(req, res) {
        try {
            let errorMsg = [];
            if (req.query.error) {
                errorMsg = req.query.error.split(',')
            }
            res.render('home', {errorMsg})
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async signUpProcess(req, res) {
        try {
            const { name, email, password, role } = req.body
            const hashPassword = await bcrypt.hash(password, 12);
            await User.create({ name, email, role, password: hashPassword })
            res.redirect('/login')
        } catch (error) {
            let errorMsg = [];
            if (error.name === "SequelizeValidationError") {
                error.errors.forEach(err => {
                    errorMsg.push(err.message)
                });

            res.redirect(`/signup?error=${errorMsg}`)
            }
        }
    }

    static async login(req, res) {
        try {
            const { error } = req.params
            res.render('login', {
                error
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginProcess(req, res) {
        // console.log(">>>>>>>>>00");
        // return;
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })
            console.log(user);
            // res.send(user)

            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if(isValidPassword) {
                    if(user.role === "admin") {
                        req.session.userId = user.id;
                        res.redirect('/admin')
                    } else if(user.role === "user") {
                        req.session.userId = user.id;
                        res.redirect('/user')
                    }
                } else {
                    const error = "Invalid email or password"
                    return res.redirect(`/login?error=${error}`)
                }
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginAdmin(req, res) {
        try {
            const { error } = req.params
            res.render('loginAdmin', {
                error
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginAdminProcess(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email }
            })

            // if (user) {
            //     const isTruePassword = bcrypt.compareSync(password, user.password)
            //     if (isTruePassword) {
            //         req.session.id = user.id;
            //         return res.redirect('/admin')
            //     }
            //     else {
            //         const error = "Invalid email or password"
            //         return res.redirect(`/login?error=${error}`)
            //     }
            // }
            return res.redirect('/admin')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async showShoeAdmin(req, res) {
        try {
            const { deleteMsg } = req.query
            const data = await Shoe.shoeAdminShowAll()
            // res.send(data)
            res.render('showShoeAdmin', { data, deleteMsg })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async showShoe(req, res) {
        try {
            const { buyMsg, orderBy } = req.query
            const data = await Shoe.shoeShowAll(orderBy)
            res.render('showShoe', { data, buyMsg })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async buyShoe(req, res) {
        try {
            let { id } = req.params
            let dataMsg = await Shoe.findOne({
                where: {
                    id: id
                }
            })
            let data = await Shoe.decrement('stock', {
                where: {
                    id: id
                },
                by: 1,
            })
            res.redirect(`/shoes?buyMsg=Success Buy Shoe ${dataMsg.brand}!`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async soldShoe(req, res) {
        try {
            let data = await Shoe.findAll({
                where: {
                    stock: {
                        [Op.lte]: 0
                    }
                },
                order: [["id", "ASC"]]
            })
            res.render('soldShoeList', { data })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async getAddNewShoe(req, res) {
        try {
            let { errors } = req.query
            if (errors) {
                errors = errors.split(',')
            }
            console.log(errors);
            res.render('addShoe', { errors })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postAddNewShoe(req, res) {
        try {
            const { brand, stock, price, image, status } = req.body
            // console.log('aa')
            let data = await Shoe.create({ brand, stock, price, image, status, UserId: 1 });
            // console.log('bbbbbbb')
            res.redirect('/admin/shoes')
        } catch (error) {
            console.log(error)
            // let errorMsg = []
            // if (error.name = 'SequelizeValidationError') {
            //     errorMsg = error.errors.map(err => err.message)
            //     console.log(errorMsg);
            //     res.redirect('/admin/shoes/add?errors=' + errorMsg)
            // } else {
            //     res.send(error)
            // }
        }
    }

    static async getEditShoe(req, res) {
        try {
            const { id } = req.params;
            let { errors } = req.query
            if (errors) {
                errors = errors.split(',')
            }
            const selectedShoe = await Shoe.findByPk(id);
            res.render('editShoe', { selectedShoe, errors });
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async postEditShoe(req, res) {
        try {
            const { id } = req.params
            const { brand, stock, price, image, status } = req.body;
            await Shoe.update({
                title: `${brand}`,
                stock: `${stock}`,
                price: `${price}`,
                image: `${image}`,
                status: `${status}`,
            }, {
                where: {
                id: `${id}`
                }
            })
            res.redirect('/admin/shoes')
            // console.log('dddd')
        } catch (error) {
            let errorMsg = []
            if (error.name === 'SequelizeValidationError') {
                errorMsg = error.errors.map(err => err.message)
                const { id } = req.params
                res.redirect(`/admin/shoes/edit/${id}?errors=` + errorMsg)
            } else {
                console.log(error)
                res.send(error)
            }
        }
    }

    static async editProfile(req, res) {
        try {
            const { id } = req.params
            let users = await Profile.findByPk(id)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async getShoeCategories(req, res) {
        try {
            let dataShoe = await Book.findAll();
            let dataCategories = await Categorie.findAll()
            // res.send(dataCategories)
            res.render('shoeCategory', { dataShoe, dataCategories })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postShoeCategories(req, res) {
        try {
            const { ShoesId, CategoriesId } = req.body

            await Shoeshascategorie.create({ ShoesId: ShoesId, CategoriesId })

            res.redirect('/admin/shoes')
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async deleteShoe(req, res) {
        try {
            const { id } = req.params
            let dataMsg = await Shoe.findOne({
                where: {
                    id: id
                }
            })
            await Shoe.destroy({
                where: {
                    id: `${id}`
                }
            })

            res.redirect(`/admin/shoes?deleteMsg=Shoes ${dataMsg.brand} has been remove!`)
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async logout(req, res) {
        try {
            await req.session.destroy()
            res.redirect('/')
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller;