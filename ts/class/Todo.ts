import { Task } from "./Task.js";

class Todo {
    tasks: Array<Task> = []
    #backend_url = ''
    constructor(backend_url: string) {
        this.#backend_url = backend_url
    }
    getTasks = async (): Promise<Task[]> => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url)
                .then(response => response.json())
                .then((response) => {
                    this.#readJson(response)
                    resolve(this.tasks)
                }, (error) => {
                    reject(error)
                })
        })
    }
    addTask = async (text: string) => {
        return new Promise(async (resolve, reject) => {
            const json = JSON.stringify({
                description: text,
                status: true
            })
            fetch(this.#backend_url + '/new', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
                .then(response => response.json())
                .then(response => {
                    resolve(this.#addToAray(response.id, text))
                }), (error: any) => {
                    reject(error)
                }
        })
    }
    removeTask = (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url + '/delete/' + id, {
                method: 'delete'
            })
                .then(response => response.json())
                .then(response => {
                    this.#removeFromArray(id)
                    resolve(response.id)
                }, (error: any) => {
                    reject(error)
                })
        })
    }
    updateStatus = (id: number) => {
        return new Promise(async (resolve, reject) => {
            fetch(this.#backend_url + '/update/' + id, {
                method: 'put'
            })
                .then(response => response.json())
                .then(response => {
                    this.#updateArray(id)
                    resolve(response.id)
                }, (error: any) => {
                    reject(error)
                })
        })
    }
    #readJson(taskAsJson: any): void {
        taskAsJson.forEach((node: any) => {
            const task = new Task(node.id, node.description, node.status)
            this.tasks.push(task)
        })
    }
    #addToAray(id: number, text: string) {
        const task = new Task(id, text, true)
        this.tasks.push(task)
        return task
    }
    #removeFromArray(id: number): void {
        const arrayWithoutRemoved = this.tasks.filter(task => task.id !== id)
        this.tasks = arrayWithoutRemoved
    }
    #updateArray(id: number): void {
        const updatedArray = this.tasks.filter(task => {
            if (task.id === id) {
                task.status = !task.status
            }
        })
        this.tasks = updatedArray
    }
}


export { Todo }