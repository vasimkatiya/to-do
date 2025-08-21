import { editTask } from "./edit";
import { GlobalTasks,projectArray } from "./project";
// render.js
import { projectBtn } from "./btn";   // <-- THIS IS REQUIRED
import { saveLocal } from "./storage";

export const renderTask = (tasks) =>{
    let taskCon = document.querySelector(".task-con");
    if(!taskCon){
        taskCon = document.createElement('div');
        taskCon.classList.add('task-con');
        document.querySelector('body').appendChild(taskCon);
    }
    taskCon.innerHTML = '';

    if(!tasks){
        console.error("project cant defined the renderTask functio is called !");
        return;
    }

    tasks.forEach( task =>{
        const taskDiv = document.createElement('div');
        taskDiv.classList.add("task-div")
        taskDiv.innerHTML = `
        <h3> task : ${task.task}</h3>
        <h3> description : ${task.description}</h3>
        <h3> date : ${task.date}</h3>
        <h3> notes : ${task.notes}</h3>
        <h3> priority : ${task.priority}</h3>
        <h3> project name : ${task.projectname}</h3>
        <div class= "btns">
        <button class ="complete" data-id="${task.id}">complete</button>
        <button class ="edit" data-id="${task.id}">edit</button>
        <button class ="remove" data-id="${task.id}">remove</button>
        </div>
        `;
        taskCon.appendChild(taskDiv);

    });

    
    taskCon.addEventListener("click",(e)=>{
        const id = Number(e.target.dataset.id);
        if(!id && id !== 0){
            return;
        }
        if(e.target.classList.contains("edit")){
            editTask(id);
        }
       else if (e.target.classList.contains("remove")) {
    const index = GlobalTasks.findIndex(t => t.id == id);
    if (index !== -1) {
        
        const task = GlobalTasks[index];
        const project = projectArray.find(p => p.name === task.projectname);
        if (project) {
            project.tasks = project.tasks.filter(t => t.id !== id);
        }

        
        GlobalTasks.splice(index, 1);

        renderTask(GlobalTasks);
        saveLocal();
    }
}

    })

}

export function renderProjects(projectArray) {
  const side = document.querySelector(".side");
  
  side.querySelectorAll(".project-btn").forEach(btn => btn.remove());

  projectArray.forEach(project => {
    projectBtn(project.name);
  });
}
