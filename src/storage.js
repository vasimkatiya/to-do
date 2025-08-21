


import { Project, projectArray, GlobalTasks } from "./project";

export function saveLocal() {
  localStorage.setItem("projects", JSON.stringify(projectArray));
  localStorage.setItem("tasks", JSON.stringify(GlobalTasks));
}

export function loadLocal() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  
  projectArray.length = 0;
  GlobalTasks.length = 0;

  
  projects.forEach(p => {
    const project = new Project(p.name);
    project.id = p.id;
    p.tasks.forEach(t => {
      project.addTask(t); 
    });
    projectArray.push(project);
  });

  tasks.forEach(t => GlobalTasks.push(t));
}
