
import { GlobalTasks, projectArray } from "./project";
import { renderTask } from "./render";

export function editTask(taskId) {
    const task = GlobalTasks.find(t => t.id === taskId);
    if (!task) return;

    const formContainer = document.querySelector(".form-container");

    formContainer.innerHTML = `
        <form action="" class="edit-form">
            <table>
                <tr>
                    <td><input type="text" placeholder="Enter Task" class="ntask"></td>
                    <td><input type="text" class="ndescription" placeholder="description"></td>
                    <td><input type="date" class="ndate"></td>
                    <td><input type="text" class="nnotes" placeholder="notes"></td>
                    <td class="priority-section">
                        priority :
                        <input type="radio" name="priority" class="np" value="Low">Low
                        <input type="radio" name="priority" class="np" value="Medium">Medium
                        <input type="radio" name="priority" class="np" value="High">High     
                    </td>
                    <td>
                        <select class="new-project-name"></select>
                    </td>
                    <td><button type="submit" class="sbt">Update Task</button></td>
                </tr>
            </table>
        </form>
    `;

    const form = formContainer.querySelector(".edit-form");

    // Populate project dropdown
    const select = document.querySelector(".new-project-name");
    select.innerHTML = projectArray.map(p =>
        `<option value="${p.name}">${p.name}</option>`
    ).join("");

    // Pre-fill form values
    document.querySelector(".ntask").value = task.task;
    document.querySelector(".ndescription").value = task.description;
    document.querySelector(".ndate").value = task.date;
    document.querySelector(".nnotes").value = task.notes;

    document.querySelectorAll(".np").forEach(radio => {
        if (radio.value === task.priority) radio.checked = true;
    });
    select.value = task.projectname;

    formContainer.classList.remove("hide");

    // Update on submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        task.task = form.querySelector(".ntask").value.trim();
        task.description = form.querySelector(".ndescription").value.trim();
        task.date = form.querySelector(".ndate").value.trim();
        task.notes = form.querySelector(".nnotes").value.trim();
        task.priority = form.querySelector(".np:checked")?.value;
        task.projectname = form.querySelector(".new-project-name").value;

        renderTask(GlobalTasks);
        form.reset();
        formContainer.classList.add("hide");
        
    });
}
