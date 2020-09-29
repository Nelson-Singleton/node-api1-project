const express = require('express') 
const shortid = require('shortid')
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
    

    users.push({id: shortid.generate(), ...postData})

    res.status(201).json({data: postData, users})
})
////////////////////////////////////////////////////////////////// Delete
server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundById = users.filter( user => user.id !== id)
    
    res.status(200).json({data: users})
})
///////////////////////////////////////////////////////////////// Put
server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const changes = req.body;
    const found = users.find(l => l.id == id);

    if(found) {
        Object.assign(found, changes)
        res.status(200).json({ data: users });
    } else {
        res.status(404).json({ message: "A user with that ID was not found" });
    }

})







const port = 5000;
server.listen(port, () => console.log("Server is up!"));