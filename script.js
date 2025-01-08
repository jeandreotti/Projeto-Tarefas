//selcionando elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

//Funções

const saveTodo = (text) => { //text=h3 que é o valor do campo
    let todo = document.createElement('div');//criou o elemnto pai
    todo.classList.add('todo');//atribuiu a class

    const todoTitle = document.createElement('h3');
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);//criou elemento filho com o text digitado
    
    const doneBtn = document.createElement('button');//criou o botaozinho
    doneBtn.classList.add('finish-todo');//inseriu class ao botaozinho
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';//colocou o icone
    todo.appendChild(doneBtn);//criou um elemento filho(donebtn) para o todo

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);// a div(todo) sera criada como elemento filho do pai(todoList)

    todoInput.value ='';//apaga o que tem no input depois de criado
    todoInput.focus();//foca para digitar
};

function toggleForms() {//clicando edit chama essa função, criando class hide para todoForm e todoList e fazendo aparecer editForm que estava escondido
    editForm.classList.toggle('hide');//aparece
    todoForm.classList.toggle('hide');//cria e esconde
    todoList.classList.toggle('hide');//cria e esconde
};

const updateTodo = (text) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3');

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
};

//Eventos

todoForm.addEventListener('submit', function(e){ //todoForm funciona tanto para preencher e dar ENTER ou clicar no botao
    e.preventDefault();//para o submit continuar na pagina e não ir pro backend

    const inputValue = todoInput.value;
    if(inputValue){ //se tiver conteúdo no input(não estiver em branco) chame a funcao
        saveTodo(inputValue)//chamar a funcao com o valor digitado dentro, que é atribuido ao h3
    }
});

document.addEventListener('click' , (e) => { //criou o evento dentro do documento todo, identificando o elemento clicado

    const targetEl = e.target; //pega o elemento clicado e identifica qual
    const parentEl = targetEl.closest('div');
    let todoTitle;

    if(parentEl && parentEl.querySelector('h3')){
            todoTitle = parentEl.querySelector('h3').innerHTML;
    }

    if(targetEl.classList.contains('finish-todo')){//se dentro da div contens a class finish-todo
        parentEl.classList.toggle('done');//apareca a div com a class done. Toggle inverte a cada click
    }
    if(targetEl.classList.contains('remove-todo')){
        parentEl.remove();
    }
    if(targetEl.classList.contains('edit-todo')){
        toggleForms();

        editInput.value =todoTitle
        oldInputValue = todoTitle
    }
});

cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;

    if (editInputValue){
        updateTodo(editInputValue);
    }
    toggleForms();
})