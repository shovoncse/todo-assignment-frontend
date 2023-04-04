class Task{
    id: number;
    text: string;
    status: boolean;
    constructor(id: number, text: string, status: boolean){
        this.id = id;
        this.text = text;
        this.status = status? true : false;
    }
}
export{ Task }