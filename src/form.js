//form.js file ;


import { projectArray } from "./project";


export const taskForm = () =>{
    if(document.querySelector('.form-con')){
        return;
    }
    const formCon = document.createElement('div');
    formCon.classList.add('form-con');
    formCon.innerHTML = `
    <form action="" class="task-form">
        <table>
            <tr>
                <td><input type="text" placeholder="Enter Task" class="task"></td>
                <td><input type="text" class="description" placeholder="description"></td>
                <td><input type="date" class="date"></td>
                <td><input type="text" class="notes" placeholder="notes"></td>
                <td class="priority-section">
                    priority : <input type="radio" name="priority" class="p" value="Low">Low
                               <input type="radio" name="priority" id="" class="p" value="Medium">Medium
                               <input type="radio" name="priority" id="" class="p" value="High">High     
                </td>
                <td><select name="" id="">

                </select></td>
                <td><button type="submit">Create Task</button></td>

            </tr>
        </table>

    </form>
    `;
    document.querySelector('body').appendChild(formCon);
    updateOption()
}

 export function updateOption(){

    const selEl = document.querySelector("select");
    if(!selEl){
        return;
    }
    selEl.innerHTML = `<option value ="" disabled >default</option>`;

    // const projectObj = projectArray.find(p=> p.name === select);
    
    projectArray.forEach(ele=>{
                
        const option = document.createElement('option');
        option.textContent = ele.name;
        option.value = ele.name;
        selEl.appendChild(option);
    });

}


export function editUpdate(selector){
 const select  = document.querySelector(selector);
 if(!select){
    console.error("select can't define !")
 }
 select.innerHTML = `<option value="">select project</option>`;
 projectArray.forEach(sel=>{
    const option = document.createElement("option");
    option.textContent = sel.name;
    option.value = sel.name;
    select.appendChild(option);
 });    
}