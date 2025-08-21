
export class Task {
    static id = 0;
    constructor(task,description,date,notes,priority,projectname){
        this.id = Task.id++;
        this.task = task;
        this.description = description;
        this.date = date;
        this.notes = notes;
        this.priority = priority;
        this.projectname = projectname;
    }
}


