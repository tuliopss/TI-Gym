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

app.get('/home', (req, res) => {
    res.render('./LandingPage/index')
})

const instructorRoutes = require('./routes/instructorRountes');
app.use('/instructor', instructorRoutes);

const membersRoutes = require('./routes/memberRoutes');
app.use('/member', membersRoutes);

const signRoutes = require('./routes/signRoutes');
app.use('/', signRoutes);









