// const backend_root_url = 'http://localhost:3001';
const backend_root_url = 'https://todo-assignment-backend-by-shovan.onrender.com'; //task6
import { Task } from "./class/Task.js";   //task4
import { Todo } from './class/Todo.js';   //task4

const todoList = new Todo(backend_root_url);   //task4

const list = <HTMLDivElement>document.getElementById('task-list');
const input = <HTMLInputElement>document.getElementById('todoinput');
const addTask = <HTMLButtonElement>document.getElementById('addTask');
const loader = <HTMLImageElement>document.getElementById('loader');

// loader
const setLoader = (status: boolean) => {
    if (status) {
        loader.classList.add('active')
        list.classList.add('loading')
    } else {
        loader.classList.remove('active')
        list.classList.remove('loading')
    }
}

input.disabled = true
setLoader(true);

todoList.getTasks()
    .then((tasks: Array<Task>) => {
        tasks.forEach((task: Task) => {
            renderTask(task);
        });
        input.disabled = false;
        setLoader(false);
    }).catch(error => {
        console.log(error)
    });

addTask.addEventListener('click', event => {
    setLoader(true);
    const text = input.value.trim();
    if (text !== '') {
        todoList.addTask(text).then((task) => {
            input.focus()
            renderTask(<Task>task)
            input.value = ''
            setLoader(false);
        })
    }
    // timeout for loader
    event.preventDefault()
})

const renderTask = (task: Task) => {
    const item: HTMLDivElement = document.createElement('div');
    item.setAttribute('class', 'flex mb-4 items-center');
    item.setAttribute('data-key', task.id.toString())
    renderPTag(item, task, task.status ? true : false)
    renderStatusBtn(item, task.id, task.status ? true : false)
    renderRemoveBtn(item, task.id)
    list.append(item);
}

const renderPTag = (item: HTMLDivElement, task: Task, status: boolean) => {
    console.log(status);
    const ptag: HTMLParagraphElement = document.createElement('p');
    if (status) {
    ptag.setAttribute('class', 'w-full text-grey-darkest');
    }else{
    ptag.setAttribute('class', 'w-full line-through text-green');
    }
    item.setAttribute('data-key', task.id.toString())
    ptag.innerHTML = task.text
    item.appendChild(ptag)
}


const renderStatusBtn = (item: HTMLDivElement, id: number, status: boolean) => {

    const btn: HTMLButtonElement = document.createElement('button');
    btn.setAttribute('data-key', id.toString())
    
    if (status) {
        btn.setAttribute('class', 'flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green');
        btn.innerHTML = 'Done'
    } else {
        btn.setAttribute('class', 'flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey');
        btn.innerHTML = 'Not Done'
    }

    item.appendChild(btn)
    btn.addEventListener('click', event => {
        setLoader(true);
        todoList.updateStatus(id).then((id) => {
            
            //find and add line through
            const ptag = document.querySelector(`[data-key='${id}'] p`)

            if (ptag) {
                ptag.classList.toggle('line-through')
                ptag.classList.toggle('text-green')
                ptag.classList.toggle('text-grey-darkest')
            }

            //find and change button text
            const btn = document.querySelector(`[data-key='${id}'] button`)
            if (btn) {
                btn.classList.toggle('text-green')
                btn.classList.toggle('border-green')
                btn.classList.toggle('hover:bg-green')
                btn.classList.toggle('text-grey')
                btn.classList.toggle('border-grey')
                btn.classList.toggle('hover:bg-grey')
                btn.innerHTML = btn.innerHTML === 'Done' ? 'Not Done' : 'Done'
            }
            setLoader(false);

        }).catch(error => {
            console.log(error)
        })
    })


}

const renderRemoveBtn = (item: HTMLDivElement, id: number) => {

    const btn: HTMLButtonElement = document.createElement('button');
    btn.setAttribute('class', 'flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red');
    btn.innerHTML = 'Remove'
    item.appendChild(btn)
    btn.addEventListener('click', event => {
        setLoader(true);
        todoList.removeTask(id).then((id) => {

            const removeElement = document.querySelector(`[data-key='${id}']`)
            if (removeElement) {
                list.removeChild(removeElement)
                setLoader(false);
            }
        }).catch(error => {
            console.log(error)
        })
    })


}

