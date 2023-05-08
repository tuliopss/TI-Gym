//CONFIG
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/index.js', express.static(path.join(__dirname, 'public/index.js'), {type: 'application/javascript'}));

mongoose
.connect('mongodb+srv://tuliov1:pTOCL6NiFgurFj0A@apicluster.kthwnho.mongodb.net/')
.then(() => {
    console.log('Mongo conectado');
    app.listen(3000)
})
.catch((err) => console.log(err));


app.get('/', (req, res) => {
    
    res.render('login')
    
})

app.get('/register', (req, res) => {
    res.render('register')
})

const personRoutes = require('./routes/personRountes');
app.use('/person', personRoutes);




