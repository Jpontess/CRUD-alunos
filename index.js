const express = require ('express')
const app = express()
app.use(express.json())


let banco = [
    {id:1, nome: 'João Pedro', idade: 20, modalidade: 'Jiu-Jitsu'},
    {id:2, nome: 'Raphaela Pereira', idade: 19, modalidade: 'Musculação'}
]


app.get('/aluno', (req, res)=>{
    res.json(banco)
})

app.get('/aluno/:id', (req, res)=>{
    const {id} = req.params

    const lerPorId = banco.find(b => b.id === parseInt(id))

    if(!lerPorId){
        return res.status(404).json({mensagem: 'Aluno naão encontrado'})
    }

    res.json(lerPorId)
})


app.post('/aluno/cadastro', (req, res)=>{
    const {id, nome, idade, modalidade} = req.body

    const cadastroAluno = {
        id: id,
        nome: nome,
        idade: idade,
        modalidade: modalidade
    }

    banco.push(cadastroAluno)
    res.status(201).json({banco})
})

app.put('/aluno/:id', (req,res)=>{
    const {id} = req.params
    const {nome, idade, modalidade} = req.body

    const editar = banco.findIndex(aluno => aluno.id == id)

    if(editar === -1){
        return res.status(404).json({mensagens: 'Aluno não encotrado'})
    }

    banco[editar].nome = nome
    banco[editar].idade = idade
    banco[editar].modalidade = modalidade

    res.json({mensagem: 'Aluno atualizado com sucesso',},banco[editar])
})

app.delete('/aluno/:id',(req,res)=>{
    const {id} = req.params

    const index = banco.findIndex(b => b.id === parseInt(id))

    if(index === -1){
        return res.status(404).json({mensagem: 'Aluno não encotrado'})
    }

    banco.splice(index, 1)

    res.send(banco).json({mesagem: 'Aluno deletado com sucesso'})

})

app.listen(3000, ()=>{
    console.log(`App rodando na porta http://localhost:3000`)
})