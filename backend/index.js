const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(cors())

const todos = []

class Todo {
    static Todos = []
    static Id = 1
    constructor({ name, description = "", important = false }) {
        this.name = name
        this.description = description
        this.important = important
        this.complete = false
    }

    static AddToTodos(todo) {
        this.Todos.push(todo)
    }

    save() {
        if (this.isValid()) {
            this.id = Todo.Id;
            Todo.Id += 1;
            Todo.AddToTodos(this);
            return true
        }
        return false
    }

    isValid() {
        if (!!!this.name) {
            console.log('invalid')
            return false
        }
        return true
    }

    MarkAsComplete() {
        this.complete = true;
    }

    static Find(id) {
        return this.Todos.find(x => x.id == id)
    }

}

let x = new Todo({ name: "Title1", description: "", important: true })
x.save()
x = new Todo({ name: "Title2", description: "Eat an apple", important: false })
x.save()
x = new Todo({ name: "Title3", description: "Go to doctor", important: true })
x.save()
console.log(Todo.Todos.length)

x.MarkAsComplete()
console.log(Todo.Todos)


app.post("/", bodyParser.json(), (req, res) => {
    let x = new Todo({ ...req.body })
    if (x.save()) {
        res.status(201).send(x)
    } else {
        res.sendStatus(401)
    }
})

app.get("/", (req, res) => {
    res.send(Todo.Todos)
})

app.get("/:id/complete", (req, res) => {
    let x = Todo.Find(req.params.id)
    x.MarkAsComplete();
    res.sendStatus(200)
})

app.listen(3000, () => console.log('listening'))