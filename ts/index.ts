const backend_root_url = 'http://localhost:3001';
// const backend_root_url = 'https://todo-backend-7e6m.onrender.com'; //task6
import { Task } from "./class/Task.js";   //task4
import { Todo } from './class/Todo.js';   //task4

const todoList = new Todo(backend_root_url);   //task4

const list = <HTMLUListElement>document.getElementById('todolist');
const input = <HTMLInputElement>document.getElementById('todoinput');

input.disabled = true

//task4
todoList.getTasks()
  .then((tasks: Array<Task>) => {
    tasks.forEach((task: Task) => {
      renderTask(task);
    });
    input.disabled = false;
}).catch(error => {
    alert(error)
});

//task4
/*const renderTask = (task: Task) => {
    const item = document.createElement('li');
    item.setAttribute('class', 'list-group-item');
    item.innerHTML = task.text;
    list.append(item);
}*/

/*fetch(backend_root_url)
     .then(response => response.json())
     .then((response)=>{
        response.forEach((node:any) => {
            renderTask(node.description);
        });
        input.disabled = false;
    }, (error) => {
        alert(error)
    })*/
    //task4
    input.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            const text = input.value.trim();
            if (text !== '') {
                todoList.addTask(text).then((task) => {
                    input.value = ''
                    input.focus()
                    renderTask(<Task>task)
                })
            }
            event.preventDefault()
        }
    })

/*input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        const text = input.value.trim();
        if(text !== '') {
        const item = document.createElement('li');
        item.setAttribute('class', 'list-group-item');
        item.innerHTML = text;
        list.append(item);
        input.value = '';
    }
    }
})

//task3
input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        const text = input.value.trim();
        if(text !== '') {
            renderTask(text);
            input.value = '';
        }
    }
})
const renderTask = (text: string) => {
    const item = document.createElement('li');
    item.setAttribute('class', 'list-group-item');
    item.innerHTML = text;
    list.append(item);
}

//task3
input.addEventListener('keypress', event => {
    if (event.key === "Enter") {
    event.preventDefault();
    const text = input.value.trim();
    if(text !== '') {
        const json = JSON.stringify({description: text})
        fetch(backend_root_url + '/new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        }).then(response => response.json())
        .then((response)=>{
            renderTask(text)
            input.value = '';
        }, (error) => {
            alert(error)
        })
    }
    }
})*/

//task5
/*const renderTask = (task: Task) => {
    const item : HTMLLIElement = document.createElement('li');
    item.setAttribute('class', 'list-group-item');
    item.innerHTML = task.text;
    renderSpan(item, task.text)
    renderLink(item, task.id)
    list.append(item);
}*/
const renderTask = (task: Task) => {
    const item : HTMLLIElement = document.createElement('li');
    item.setAttribute('class', 'list-group-item');
    item.setAttribute('data-key', task.id.toString())
    renderSpan(item, task.text)
    renderLink(item, task.id)
    list.append(item);
}
const renderSpan = (item: HTMLLIElement, text: string) => {
    const span = item.appendChild(document.createElement('span'))
    span.innerHTML = text
}

/*const renderLink = (item: HTMLLIElement, id: number) => {
    const link = item.appendChild(document.createElement('a'))
    link.innerHTML = '<i class="fas fa-trash-alt"></i>'
    link.setAttribute('class', 'float-right')
}*/


const renderLink = (item: HTMLLIElement, id: number) => {
    const link = item.appendChild(document.createElement('a'))
    link.innerHTML = '<i class="bi bi-trash"></i>'
    link.setAttribute('style', 'float: right')
    link.addEventListener('click', event => {
        todoList.removeTask(id).then((id) => {
            const removeElement =  document.querySelector(`[data-key='${id}']`)
            if(removeElement) {
                list.removeChild(removeElement)
            }
        }).catch(error => {
            alert(error)
        })

        })
    
     
    }