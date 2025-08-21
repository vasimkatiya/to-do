

export class Project {
    static currentID = 0;
    constructor(name){
        this.id = Project.currentID++;
        this.name = name;
        this.tasks = [];
    }

    addTask(task){
        this.tasks.push(task);
        GlobalTasks.push(task);
    }

}

export const GlobalTasks = [];
export const projectArray = [];

