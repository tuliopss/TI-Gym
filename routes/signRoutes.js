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

router.get('/', (req, res) => {
    res.render('./Login/login')
    
})

router.get('/register', (req, res) => {
    res.render('./Register/register')
})

router.post('/register', async (req, res) => {
    
    const {username, password, confirmPassword, email} = req.body;
    const user = {
        username,
        password,
        email
    }

    if(!username || !password) {
        res.status(422).json({error: "Preencha todos os campos."});
        return;
    }

    if(password != confirmPassword) {
        res.redirect('/register')
        return;
    }

    try {
        await User.insertMany([user]) //Criando dados
        //res.status(201).json({msg: 'Conta criada com sucesso!'})
        res.redirect('/')

    } catch(error) {
        res.status(500).json({error: error})
    }
});

router.post('/', async(req, res) => {

    try {
        const checkLogin = await User.findOne({username: req.body.username})
        if(checkLogin.password === req.body.password) {

            console.log('Login realizado')
            res.render('./LandingPage/index')

        } else {
            res.send('Wrong password')
        }
    } catch(error) {
         res.redirect('/')
        
    }
})

module.exports = router