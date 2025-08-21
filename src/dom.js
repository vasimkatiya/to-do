//dom.js file

import { createBtn, projectBtn } from "./btn";
import { edit } from "./edit";
import { editUpdate, taskForm, updateOption } from "./form";
import { Project, projectArray, GlobalTasks } from "./project";
import { renderProjects, renderTask } from "./render";
import { loadLocal, saveLocal } from "./storage";
import { Task } from "./task";


export const init = () => {
    const body = document.querySelector('body');
    const side = document.querySelector('.side');
    const projectForm = document.querySelector('.project-form');

    loadLocal();



    createBtn("Add Task", "taskBtn");
    
    createBtn("all task", "all-task");


    const addTaskBtn = document.querySelector('.taskBtn');
    const allTaskBtn = document.querySelector(".all-task")

renderProjects(projectArray)
    
    projectForm.addEventListener("submit", (ele) => {
        ele.preventDefault();

        const proName = projectForm.querySelector(".project-name");
    if(proName.value === ""){
        alert("enter valid name:");
        return;
    }

        const newProejct = new Project(proName.value);

        if (proName.value.trim() == " ") {
            alert("enter project name !")
            return;
        }
        if (projectArray.some(pro => pro.name == proName.value)) {
            alert("project already exist !");
            return;
        }
        console.log(newProejct);
        projectArray.push(newProejct);
        projectBtn(newProejct.name)
        renderProjects(projectArray);
        saveLocal();
    });
    

    if (document.querySelector('.form-con')) {
        return;
    }
    const formCon = document.createElement('div');
    formCon.classList.add('form-con');
    formCon.classList.add("hide");
    formCon.innerHTML = `
    <form action="" class="task-form">
        <table>
            <tr>
                <td><input type="text" placeholder="Enter Task" class="task"></td>
                <td><input type="text" class="description" placeholder="description"></td>
                <td><input type="date" class="date"></td>
                <td><input type="text" class="notes" placeholder="notes"></td>
                <td class="priority">
                    priority : <input type="radio" name="priority" class="p" value="Low">Low
                               <input type="radio" name="priority" id="" class="p" value="Medium">Medium
                               <input type="radio" name="priority" id="" class="p" value="High">High     
                </td>
                <td><select name="" id="" class="project-name">

                </select></td>
                <td><button type="submit" class="submit">Create Task</button></td>

            </tr>
        </table>

    </form>
    `;
    document.querySelector('body').appendChild(formCon);

    addTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (!document.querySelector(".project-btn")) {
            alert("create project, before add task !");
            return;
        }
    
        updateOption();
        formCon.classList.remove("hide");
    })


    let isEditMode = false;
    let isEditingId = null;

    const formTask = formCon.querySelector(".task-form");
    formTask.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("hello its work !");

       
        const task = formTask.querySelector(".task").value.trim();
        const description = formTask.querySelector(".description").value.trim();
        const date = formTask.querySelector(".date").value.trim();
        const notes = formTask.querySelector(".notes").value.trim();
        const priority = formTask.querySelector(".p:checked")?.value || "";
        const projectName = formTask.querySelector("select").value;

        //add validation ;
        if (!task || !date || !priority || !projectName) {
            alert('please fill all required fields ! , required fields : task, date, priority and project name ')
            return;
        }

        const projectObj = projectArray.find(t => t.name === projectName);

        if (isEditMode) {
            const taskObj = GlobalTasks.find(t => t.id = isEditingId);
            if (taskObj) {

                taskObj.task = task;
                taskObj.description = description;
                taskObj.date = date;
                taskObj.notes = notes;
                taskObj.priority = priority;
                taskObj.projectname = projectName;

            }

            isEditMode = false;
            isEditingId = null;
        }
        else {
            const newTask = new Task(task, description, date, notes, priority, projectName);
            console.log(newTask);

            // const projectObj = projectArray.find(p=>p.name === projectName);
            if (projectObj) {
                projectObj.addTask(newTask);
            }


        }


      

        console.log(projectObj);
        renderTask(GlobalTasks);
        formCon.classList.add("hide");
        formTask.reset();
        saveLocal();
    });


    document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("project-btn")){
            e.preventDefault();
            const projectName = e.target.dataset.project;
            const projectObj = projectArray.find(p=> p.name === projectName);
            if(projectObj){
                renderTask(projectObj.tasks)
            }
            else{
                renderTask(GlobalTasks)
            }
        }
    })

    allTaskBtn.addEventListener("click", (e) => {
        e.preventDefault();
        renderTask(GlobalTasks);
    });

    
}

