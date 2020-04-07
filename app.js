// Init State
const state = {
  filter: '',
  todos: []
};

// UI_Elements
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const btnFilterAll = document.querySelector('.filter--all');
const btnFilterCompleted = document.querySelector('.filter--completed');
const btnFilterUncompleted = document.querySelector('.filter--uncompleted');
const btnsFilter = document.querySelectorAll('.filter');

// Event Listeners
document.addEventListener('DOMContentLoaded', init);
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteAndCheck);
btnFilterAll.addEventListener('click', () => setFilter('all'));
btnFilterCompleted.addEventListener('click', () => setFilter('completed'));
btnFilterUncompleted.addEventListener('click', () => setFilter('uncompleted'));

// Functions
function init() {
  emptyAndFocusInput();
  getLocalTodos();
  setFilter('all');
}

function setState(key, val) {
  state[key] = val;
  console.log(state);
}

function emptyAndFocusInput() {
  todoInput.value = '';
  todoInput.focus();
}

function setFilter(filterValue) {
  btnsFilter.forEach(btn => {
    if (btn.classList.contains(`filter--${filterValue}`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  setState('filter', filterValue);
  filterTodos();
}

function addTodo(e) {
  e.preventDefault();
  let todoInputVal = todoInput.value;
  // let todo = {
  //   text: todoInput.value,
  //   completed: false
  // };

  if (todoInputVal) {
    // Create todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInputVal;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    // Check Mark Button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    // Append todoDiv to todoList
    todoList.appendChild(todoDiv);
    saveLocalTodos(todoInputVal);
    emptyAndFocusInput();
  }
}

function deleteAndCheck(e) {
  const item = e.target;

  // Delete todo
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;

    // Animation
    todo.classList.add('fall');
    removeLocalTodo(todo);

    // Remove after transition
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }

  // Checkmark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodos() {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    switch (state.filter) {
      case 'all':
        todo.style.display = 'flex';
        break;

      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;

      default:
        break;
    }
  });
}

function saveLocalTodos(todo) {
  if (localStorage.getItem('todos') === null) {
    state.todos = [];
  } else {
    state.todos = JSON.parse(localStorage.getItem('todos'));
  }

  state.todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(state.todos));
}

function getLocalTodos() {
  // let todos;

  if (localStorage.getItem('todos') === null) {
    state.todos = [];
  } else {
    state.todos = JSON.parse(localStorage.getItem('todos'));
  }

  state.todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Check Mark Button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    // Check Mark Button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);

    // Append todoDiv to todoList
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodo(todo) {
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoText = todo.children[0].innerText;
  const todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
