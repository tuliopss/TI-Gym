const express = require('express');
const router = express.Router();
const Instructor = require('../models/Instructor');

//CREATE
router.post('/', async(req, res) => {
    const {name, salary, department} = req.body;
    if(!name) {
        res.status(422).json({error: 'Nome inexistente, insira um nome.'})
        return
    }
    const instructor = {
        name,
        salary,
        department
    }

    try {
        await Instructor.create(instructor) //Criando dados
        // res.status(201).json({msg: 'Pessoa inserida no sistema com sucesso!'})
        console.log('Instructor inserido com sucesso');
        res.redirect('/dashboardInstructor')
    } catch(error) {
        res.status(500).json({error: error})
    }
})

//READ
router.get('/', async (req, res) => {
    try {
        const instructors = await Instructor.find();

        res.status(200).json(instructors)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

// router.get('/', async(req, res) => {
    
//     const id = req.query.id;
//         try {
//             const instructor = await Instructor.findOne({_id: id});

//             if(!instructor) {
//                 res.status(422).json({msg: "Usuário não encontrado."})
//                 return
//             }
//             res.status(200).json(instructor)

//         } catch(error) {
//             res.status(500).json({error: error})

//         }
// })
// router.get('/edit/:id', (req, res) => {
//     const id = req.params.id
//     Instructor.findById(id, (err, user) => {
//         if(err) {
//             res.redirect('/dashboardInstructor')
//         } else {
//             if(user == null) {
//                 res.redirect('/dashboardInstructor')
//             } else {
//                 res.render('editview', {
//                     title: 'Edit user',
//                     user: Instructor
//                 })
//             }
//         }
//     })
//     //res.render('./editview', { title: 'Testee' })

// })
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Instructor.findById(id);
        if (user == null) {
            res.redirect('/dashboardInstructor');
        } else {
            res.render('editview', {
                title: 'Edit user',
                user: user
            });
        }
    } catch (err) {
        res.redirect('/dashboardInstructor');
    }
});

// router.post('/edit/:id',  async(req, res) => {
//     const id = req.params.id;
//     try {
//        const updateInstructor = await Instructor.findByIdAndUpdate(id, {
//             name: req.body.name,
//             salary: req.body.salary,
//             department: req.body.department
//         }, (err, result) => {
//             if(err) {
//                 res.json({msg: err.message})
//             } else {
//                 res.redirect('/dashboardInstructor')
//             }
//         })
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
    
// })
router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const updatedInstructor = await Instructor.findByIdAndUpdate(id, {
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
      });
  
      if (!updatedInstructor) {
        res.status(422).json({ msg: "Usuário não encontrado." });
        return;
      }
  
      res.redirect('/dashboardInstructor');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  





router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const instructor = await Instructor.findOne({ _id: id });

        if (!instructor) {
            res.status(422).json({ msg: "Usuário não encontrado." });
            return;
        }

        res.status(200).json(instructor);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


//UPDATE
router.patch('/:id', async(req, res) => {
    const id = req.params.id
    const {name, salary, department} = req.body;
    const instructor = {
        name,
        salary,
        department
    }

    try {
        const updatedInstructor = await Instructor.updateOne({_id: id}, instructor);

        if(updatedInstructor.matchedCount === 0) {
            res.status(422).json({msg: "Usuário não encontrado."})
            return
        }
        
        res.status(200).json(instructor);

    } catch (error) {
        res.status(500).json({error: error})

    }
})

router.post('/edit/:id', (req, res) => {
    const id = req.params.id;

    Instructor.findByIdAndUpdate(id, {
        name: req.body.name,
        salary: req.body.salary,
        department: req.body.department
    }, (err, result) => {
        if(err) {
            res.json({msg: err.message})
        }
    })
})


//DELETE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const instructor = await Instructor.findOne({_id: id});

    if(!instructor) {
        res.status(422).json({msg: "Usuário não encontrado."})
        return
    }
    try {
        await Instructor.deleteOne({_id: id})
        res.status(200).json({msg: "Usuário removido com sucesso."})
    

    } catch(error) {
        res.status(500).json({error: error})
    }
})  
module.exports = router