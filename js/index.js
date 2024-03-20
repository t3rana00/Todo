const BACKEND_ROOT_URL = 'http://localhost:3001'

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = true

//create separate function for rendering task/
const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML = task
    list.append(li)
}

//create separate function for getting tasks/
const getTasks = async () => {
    try {
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json()
        json.forEach(task => {
            renderTask(task.description)
        })
        input.disabled = false
    } catch (error) {
        alert('Error retrieving tasks' + error.message)
    }
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
            if (task!=='') {
                const li = document.createElement('li')
                li.setAttribute('class', 'list-group-item')
                li.innerHTML = task
                list.append(li)
                input.value = ''                        
            }    
                saveTask(task).then((json) => {
                    renderTask(task)
                    input.value = ''                        
            })
        }    
    });
    
getTasks()
