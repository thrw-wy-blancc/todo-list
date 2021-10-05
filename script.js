const input = document.getElementById("input");
const todos = document.getElementById("todos");
const form = document.getElementById("form");

const todo = JSON.parse(localStorage.getItem("todos"));

if(todo){
    todo.forEach(todo => addTodo(todo));
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});


function addTodo(todo){
    let todoText = input.value;

    if (todo){
        todoText = todo.text;
    }
    if(todoText){
        const todoEl = document.createElement("li");
        if(todo && todo.completed){
            todoEl.classList.add("completed");
        }
        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        });
        todoEl.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            todoEl.remove();
            updateLS();
        });
        todos.appendChild(todoEl);
        input.value = "";

        updateLS();
    }

}

function updateLS(){
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed")
        })
    })

localStorage.setItem("todos", JSON.stringify(todos));
}