import express from 'express'

import { PrismaClient } from '@prisma/client'

import cors from 'cors'

const prisma = new PrismaClient()

const app=express()
app.use(cors())
app.use(express.json())



app.get('/usuarios', async (req,res)=>{

    const users = await prisma.user.findMany()
    res.status(200).json(users)
})

app.post('/usuarios/', async (req, res)=>{
    
    try {
        await prisma.user.create({

            data: {
                        email: req.body.email,
                        name: req.body.name,
                        age: req.body.age
            }
            
        })
    } catch (error) {
        res.status(501).send('erro ao criar usuario')
    }
   
    res.status(201).json(req.body)

})

app.put('/usuarios/:id', async (req, res)=>{

    const {id} = req.params
    const {email , name, age} = req.body
  
    try {
        const userUpdate = await prisma.user.update({
           
            
            where: {id: id },
            data: {email, name, age }
        })

        res.status(200).json(userUpdate)

    } catch (error) {
        console.error(error.message);
        res.status(400).send('erro na requisição')
        
    }
})

app.delete('/usuarios/:id', async (req,res)=>{
    const {id} = req.params

    try {
        const userDelete = await prisma.user.delete({
            where: {id: id}
            
        })
        console.log(userDelete);
       
        res.status(204).send('item deletado')

    } catch (error) {
        res.send(500).json(error.message)
    }

    
    
})












app.listen(3000, ()=>{
    console.log('servidor online');
    
})