const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

//Create a client
    // router.post('/', async(req, res) => {
    //     const {name, age, nameEx, setEx, repEx} = req.body;
    //     const workout = {
    //         name: nameEx,
    //         set: setEx,
    //         rep: repEx
    //     }

    //     if(!name) {
    //         res.status(422).json({error: 'Nome inexistente, insira um nome.'})
    //         return
    //     }
    //     const member = {
    //         name,
    //         age,
    //         workout: [workout]
    //     }
    //     try {
    //         await Member.create(member) //Criando dados
    //         // res.status(201).json({msg: 'Pessoa inserida no sistema com sucesso!'})
    //         res.redirect('/dashboard')
    //         return;

    //     } catch(error) {
    //         res.status(500).json({error: error})
    //     }
    // })
    router.post('/', async(req, res) => {
        const {name, age, objective} = req.body;
       
            if(!name) {
                res.status(422).json({error: 'Nome inexistente, insira um nome.'})
                return
            }
        const member = {
            name,
            age,
            objective
        }
        try {
            await Member.create(member) //Criando dados
            //res.status(201).json({msg: 'Pessoa inserida no sistema com sucesso!'})
            res.redirect('/dashboardMember')
            return;
    
        } catch(error) {
            res.status(500).json({error: error})
        }
    })
    
//Read client
router.get('/', async (req, res) => {
    try {
       const members = await Member.find();
        res.status(201).json(members)
    } catch(error) {
        res.status(500).json({error: error})
    }
})
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Member.findById(id);
        if (user == null) {
            res.redirect('/dashboardMember');
        } else {
            res.render('editviewmember', {
                title: 'Edit user',
                user: user
            });
        }
    } catch (err) {
        res.redirect('/dashboardMember');
    }
});

router.post('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const updatedMember = await Member.findByIdAndUpdate(id, {
        name: req.body.name,
        age: req.body.age,
        objective: req.body.objective
      });
  
      if (!updatedMember) {
        res.status(422).json({ msg: "Usuário não encontrado." });
        return;
      }
  
      res.redirect('/dashboardMember');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
       const member = await Member.findOne({_id: id});

        if(!member) {
            res.status(422).json({msg: "Usuário não encontrado."})
            return
        }

        res.status(201).json(member)
    }catch(error) {
        res.status(500).json({error: error})
    }
})



  

//Update member
router.patch('/:id', async(req, res) => {
    const id = req.params.id;
    const {name, age, workout} = req.body;
    const member = {
        name,
        age,
        workout
    }

    try {
        const updatedMember = await Member.updateOne({_id: id}, member);
        if(updatedMember.matchedCount == 0 ) {
            res.status(422).json({msg: "Usuário não encontrado."})
            return
        }

        res.status(200).json(member);
        
    } catch(error) {
        res.status(500).json({error: error})
    }
})




//Delete member
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const member = await Member.findOne({_id: id});

    if(!member) {
        res.status(422).json({msg: "Usuário não encontrado."})
        return
    }
    try {
        await Member.deleteOne({_id: id})
        res.status(200).json({msg: "Usuário removido com sucesso."})
    

    } catch(error) {
        res.status(500).json({error: error})
    }
})  
module.exports = router