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
    } else if(!foundById) {
        res.status(404).json({ message: "Coudln't find a user with that ID."})
    } else (res.status(500).json({message: "The user information could not be found"}))

})
/////////////////////////////////////////////////////////////////// Post
server.post('/api/users', (req, res) => {
    const postData = req.body
    
    if(postData.name && postData.bio){
        users.push({id: shortid.generate(), ...postData})
        res.status(201).json({data: postData, users})
    } else if(!postData.name || !postData.bio) {
        res.status(400).json({message: "Please provide name and bio for the user"})}
        else (res.status(500).json({message: "There was an error while saving the user to the database"}))})
////////////////////////////////////////////////////////////////// Delete
server.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const foundById = users.filter( user => user.id !== id)
    if(foundById=[]){
        res.status(404).json({message: "The user with the specified ID does not exist"})
    } else if (foundById != []){
    res.status(200).json({data: users})}
    else (res.status(500))
})  
///////////////////////////////////////////////////////////////// Put
server.put('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const changes = req.body;
    const found = users.find(l => l.id == id);

    if(found) {
        Object.assign(found, changes)
        res.status(200).json({ data: users });
    }   else if (!changes.name || !changes.bio){
        res.status(400).json({errorMessage: "Please provide name and bio for the user"})
    } 
    
    else if (!found) {
        res.status(404).json({ message: "A user with that ID was not found" });
    } 

})







const port = 5000;
server.listen(port, () => console.log("Server is up!"));