const express = require('express');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')

const app = express();


app.use(bodyParser.json())
app.use(cors())

const database = {
    users: [
        {
            id: "123",
            name: "John",
            password:'cookies',
            email: "john@gmail.com",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Max",
            password: "cookies1",
            email: "max@gmail.com",
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:"987",
            has:'',
            email: "john@gmail.com"
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
}  )

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('error logging in ')
        }
})

app.post('/register', (req,res) => {
    const { email, name, password} =req.body;
    database.users.push({
        id: "125",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id) {
            found = true;
            return res.json(users);
        } 
    })
    if (!found) {
        res.status(404).json('not found ')
    }
})

app.put('/image', (req,res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(users => {
        if (users.id === id) {
            found = true;
            users.entries++
            return res.json(users.entries);
        } 
    })
    if (!found) {
        res.status(404).json('not found ')
    }
})

app.listen(3000, () => {
    console.log("app is running on pore 3000");
})

