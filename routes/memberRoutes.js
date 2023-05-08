const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

//Create a client
router.post('/', async(req, res) => {
    const {name, age, workout} = req.body;
    if(!name) {
        res.status(422).json({error: 'Nome inexistente, insira um nome.'})
        return
    }
    
    const member = {
        name,
        age,
        workout
    }

    try {
        await Member.create(member) //Criando dados
        res.status(201).json({msg: 'Pessoa inserida no sistema com sucesso!'})

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
console.log('teste')


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