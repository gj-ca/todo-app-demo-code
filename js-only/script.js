class Todo {
    constructor(title, description = "", important = false) {
        this.title = title
        this.description = description
        this.important = important
    }

    // static functions are called on the class itself,
    // not the instance
    static getTodos() {
        // finding all todos in localstorage, as json

        let todos = localStorage.getItem("todos")
        // if nothing is there, become an empty array
        if (todos == null) {
            todos = []
        } else {
            // convert json to array
            todos = JSON.parse(todos)
        }
        return todos
    }

    static SaveAllJSON(todos) {
        // convert array to json
        todos = JSON.stringify(todos)
        // set json as localstorage
        localStorage.setItem("todos", todos)
    }

    // instance methods are called on an instance of a class
    saveToLocalStorage() {
        // get all todos from local storage
        let todos = Todo.getTodos()

        // push this todo to that array
        todos.push(this)
        
        // save this new array to local storage
        Todo.SaveAllJSON(todos)

    }

    deleteFromLocalStorage() {
        // get all todos
        let todos = Todo.getTodos()

        // find {this} todo in todos
        let index = todos.findIndex(element => element.title == this.title)

        // remove from todos
        todos.splice(index, 1)
        
        // save leftovers to local storage
        Todo.SaveAllJSON(todos)

    }

    toNode(){
        // return html node
        let div = document.createElement("div")
        div.innerHTML = 
        `
        <p>${this.title}</p>
        <p>${this.description}</p>
        `
        let button = document.createElement("button")
        button.innerText ="DONE"
        button.addEventListener("click", () => {
            // calling a instance method
            this.deleteFromLocalStorage()
            // removing node from DOM
            div.remove()
        })
        div.appendChild(button)
        return div 
    }
}

// find the form
let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    // extract the values
    let title = event.target.children[0].children[1].value
    let description = event.target.children[1].children[1].value
    let important = event.target.children[2].children[1].value

    let newTodo = new Todo(title, description, important)

    newTodo.saveToLocalStorage()

    // add todo to list of todos
    const container = document.querySelector("#todos-container")
    container.appendChild(newTodo.toNode())
})

// read local storage
let todos = Todo.getTodos()
// convert each item in array to node
const container = document.querySelector("#todos-container")

todos.forEach(todo => {
    let newTodo = new Todo(todo.title, todo.description, todo.important)
    // append node to container
    container.appendChild(newTodo.toNode())

})
