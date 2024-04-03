const listInput = document.querySelector(".list-input");
const addtBtn = document.querySelector(".list-btn");
const listContainer = document.querySelector(".list-container");
const emptyMsg = document.querySelector(".empty");

//local storage para que las tareas se guarden incluso al recargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        addTaskToList(task);
    });

});


//funcion para agregar una tarea a la lista
const addTaskToList = (text) => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = text;
    li.appendChild(p);
    li.appendChild(addDelteBtn());
    listContainer.appendChild(li);
}


//funcion para crear el boton que eliminara la tarea
const addDelteBtn = () => {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

//funcion para que el boton elimine efectivamente la tarea
    deleteBtn.addEventListener("click", (e) => {
        const item = e.target.parentElement;
        listContainer.removeChild(item);

        const items = document.querySelectorAll(li);
        if (items.lenght === 0) {
            emptyMsg.style.display = "block";
        }

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const taskText = item.querySelector("p").textContent;
        const updatedTasks = tasks.filter((task) => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });
    return deleteBtn;
};


//Event listener para agregar una tarea
addtBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const text = listInput.value.trim();

    if (text !== "") {
        addTaskToList(text);

//guarda la tarea en el local storage 
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(text);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        listInput.value = "";
        emptyMsg.style.display = "none";
    } else {
        alert("No agregó ninguna tarea");
    }


});


