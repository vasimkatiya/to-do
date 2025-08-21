
export const createBtn = (name,clsname) =>{
    const existingBtn  = document.querySelector(`.${clsname}`);
    if(existingBtn) return;

    const btn = document.createElement('button');
    btn.classList.add(clsname);
    btn.textContent = name;
    document.querySelector('.btn-con').prepend(btn);
    
}

export const projectBtn = (name) =>{

    const buttons = document.querySelectorAll('.project-btn');
    
    for (const btn of buttons) {
        if(btn.textContent === name){
            return;
        }
    }

    const btn = document.createElement('button');
    btn.classList.add('project-btn');
    btn.textContent = name;
     btn.dataset.project = name;
    document.querySelector('.sided').appendChild(btn);
    
}


