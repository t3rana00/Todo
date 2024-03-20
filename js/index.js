

const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js";

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = true

//create separate function for rendering task/
const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML = task.getText()
    list.append(li)
}

//create separate function for getting tasks/
const getTasks = () => {
   
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
        
    }).catch((error) => {
        alert(error)
})
}

//create separate function for saving task/
const saveTask = async (task) => {
    try {
        const json = JSON.stringify({ description: task })
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert('Error saving task' + error.message)
    }
}

//key press enter event/
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const task = input.value.trim()
      if (task !== '') {
        todos.addTask(task).then((task) => {
          renderTask(task)
          input.value = ''   
          input.focus()                     
      })
    }    
    }
  });
  getTasks()