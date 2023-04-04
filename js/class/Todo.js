var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Todo_instances, _Todo_backend_url, _Todo_readJson, _Todo_addToAray, _Todo_removeFromArray, _Todo_updateArray;
import { Task } from "./Task.js";
class Todo {
    constructor(backend_url) {
        _Todo_instances.add(this);
        this.tasks = [];
        _Todo_backend_url.set(this, '');
        this.getTasks = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Todo_backend_url, "f"))
                    .then(response => response.json())
                    .then((response) => {
                    __classPrivateFieldGet(this, _Todo_instances, "m", _Todo_readJson).call(this, response);
                    resolve(this.tasks);
                }, (error) => {
                    reject(error);
                });
            }));
        });
        this.addTask = (text) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const json = JSON.stringify({
                    description: text,
                    status: true
                });
                fetch(__classPrivateFieldGet(this, _Todo_backend_url, "f") + '/new', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: json
                })
                    .then(response => response.json())
                    .then(response => {
                    resolve(__classPrivateFieldGet(this, _Todo_instances, "m", _Todo_addToAray).call(this, response.id, text));
                }), (error) => {
                    reject(error);
                };
            }));
        });
        this.removeTask = (id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Todo_backend_url, "f") + '/delete/' + id, {
                    method: 'delete'
                })
                    .then(response => response.json())
                    .then(response => {
                    __classPrivateFieldGet(this, _Todo_instances, "m", _Todo_removeFromArray).call(this, id);
                    resolve(response.id);
                }, (error) => {
                    reject(error);
                });
            }));
        };
        this.updateStatus = (id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Todo_backend_url, "f") + '/update/' + id, {
                    method: 'put'
                })
                    .then(response => response.json())
                    .then(response => {
                    __classPrivateFieldGet(this, _Todo_instances, "m", _Todo_updateArray).call(this, id);
                    resolve(response.id);
                }, (error) => {
                    reject(error);
                });
            }));
        };
        __classPrivateFieldSet(this, _Todo_backend_url, backend_url, "f");
    }
}
_Todo_backend_url = new WeakMap(), _Todo_instances = new WeakSet(), _Todo_readJson = function _Todo_readJson(taskAsJson) {
    taskAsJson.forEach((node) => {
        const task = new Task(node.id, node.description, node.status);
        this.tasks.push(task);
    });
}, _Todo_addToAray = function _Todo_addToAray(id, text) {
    const task = new Task(id, text, true);
    this.tasks.push(task);
    return task;
}, _Todo_removeFromArray = function _Todo_removeFromArray(id) {
    const arrayWithoutRemoved = this.tasks.filter(task => task.id !== id);
    this.tasks = arrayWithoutRemoved;
}, _Todo_updateArray = function _Todo_updateArray(id) {
    const updatedArray = this.tasks.filter(task => {
        if (task.id === id) {
            task.status = !task.status;
        }
    });
    this.tasks = updatedArray;
};
export { Todo };
