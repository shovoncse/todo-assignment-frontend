class Task {
    constructor(id, text, status) {
        this.id = id;
        this.text = text;
        this.status = status ? true : false;
    }
}
export { Task };
