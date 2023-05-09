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
        res.status(201).json({msg: 'Pessoa inserida no sistema com sucesso!'})

    } catch(error) {
        res.status(500).json({error: error})
    }
})

//READ
router.get('/', async (req, res) => {
    try {
        const instructors = await Instructor.find();

        res.status(200).json(people)

    } catch(error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async(req, res) => {
    
    const id = req.params.id;
        try {
            const instructor = await Instructor.findOne({_id: id});

            if(!instructor) {
                res.status(422).json({msg: "Usuário não encontrado."})
                return
            }
            res.status(200).json(instructor)

        } catch(error) {
            res.status(500).json({error: error})

        }
})

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