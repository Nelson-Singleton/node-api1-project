const express = require('express') 
const server = express()
server.use(express.json()) 

let users = [{
    id: 1,
    name: "Nelson", 
    bio: "Soon to be a full-stack developer!"
}]



/////////////////////////////////////////////////////////////////// Default
server.get('/', (req, res) => {
    res.status(200)
})
/////////////////////////////////////////////////////////////////// Get all users
server.get('/api/users', (req, res) => {
    res.status(200).json({data: users})
})
///////////////////////////////////////////////////////////////////Get user by ID
server.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundById = users.filter( user => user.id == id)    

    if (foundById) {
        res.status(200).json({ data: foundById })
    } else {
        res.status(404).json({ message: "Coudln't find a user with that ID."})
    }
})
/////////////////////////////////////////////////////////////////// Post
server.post('/api/users', (req, res) => {
    const postData = req.body
    let nextId = 2

    users.push({...postData, id: nextId++})

    res.status(201).json({data: postData, users})
})
////////////////////////////////////////////////////////////////// Delete
server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundById = users.filter( user => user.id !== id)
    
    res.status(200).json({data: users})
})








const port = 5000;
server.listen(port, () => console.log("Server is up!"));