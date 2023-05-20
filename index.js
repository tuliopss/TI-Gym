//CONFIG
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.set('view engine', 'ejs');
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
    res.render('./LandingPage/index')
})
app.get('/dashboardMember', (req, res) => {
    res.render('./DashboardMember/index')
})
app.get('/dashboardInstructor', (req, res) => {
    res.render('./DashboardInstructor/index')
})

// app.get('/editEJS', (req, res) => {
//     res.render('./EditView/editview', { title: 'Testee' })
// })

const instructorRoutes = require('./routes/instructorRountes');
app.use('/instructor', instructorRoutes);

const membersRoutes = require('./routes/memberRoutes');
app.use('/member', membersRoutes);

const signRoutes = require('./routes/signRoutes');
app.use('/', signRoutes);










