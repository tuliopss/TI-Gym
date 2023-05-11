const express = require('express');
const app = express()
const router = express.Router();
const User = require('../models/User');
const path = require('path');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));

router.get('/login', (req, res) => {

    res.render('./Login/login', { alertLogin: false })
    
})

router.get('/register', (req, res) => {
    res.render('./Register/register', { alertEmail: false } )
})

router.post('/register', async (req, res) => {
    const {username, password, confirmPassword, email} = req.body;
    const checkUsername = await User.findOne({username: req.body.username});
    const checkEmail = await User.findOne({email: req.body.email});
    
    const user = {
        username,
        password,
        email
    }

    if(!username || !password) {
        //res.status(422).json({error: "Preencha todos os campos."});
        res.render('./Register/register', { alertEmpty: true } )

        return;
    }
    

    if(password != confirmPassword) {
        res.render('./Register/register', { alertPass: true } )
        return;
    }

    if(checkEmail) {
        res.render('./Register/register', { alertEmail: true } )
        return;
    } else if(checkUsername) {
        res.render('./Register/register', { alertUser: true } )
        return;
    }
    

    try {
        await User.insertMany([user]) //Criando dados
        //res.status(201).json({msg: 'Conta criada com sucesso!'})
        res.redirect('/login')

    } catch(error) {
        res.status(500).json({error: error})
    }
});

router.post('/login', async(req, res) => {
    try {
        const checkLogin = await User.findOne({username: req.body.username});

        if(!checkLogin) {
             res.render('./Login/login', { alertLogin: true });
             return;
        }

        if(checkLogin.password === req.body.password) {
            console.log('Login realizado')
            res.render('./LandingPage/index')

        } else {
            res.render('./Login/login', { alertLogin: true });
             
            return;
        }
    } catch(error) {
         res.redirect('/');
         
    }   
})

module.exports = router