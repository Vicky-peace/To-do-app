document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('simpleList');
    const itemCount = document.querySelector('.footer .count span');
    const submitButton = document.getElementById('submit-button');
  
    // Function to update the item count
    function updateItemCount() {
      const totalItems = todoList.querySelectorAll('li').length;
      itemCount.textContent = totalItems;
    }
  
    // Function to save todos to local storage
    function saveTodos() {
      const todos = [];
      todoList.querySelectorAll('li').forEach(item => {
        todos.push(item.firstChild.textContent);
      });
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    // Function to create a new todo item
    function createTodoItem(text) {
      const li = document.createElement('li');
      li.textContent = text;
  
      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'x';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        li.remove();
        updateItemCount();
        saveTodos();
      });
  
      li.appendChild(deleteButton);
      return li;
    }
  
    // Function to load todos from local storage
    function loadTodos() {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(todo => {
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);
      });
      updateItemCount();
    }
  
    // Function to add a new todo item
    function addTodo() {
      if (todoInput.value.trim() !== '') {
        const newTodo = createTodoItem(todoInput.value.trim());
        todoList.appendChild(newTodo);
        todoInput.value = '';
        updateItemCount();
        saveTodos();
      }
    }
  
    // Add new todo item on Enter key press
    todoInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTodo();
      }
    });
  
    // Add new todo item on submit button click
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission behavior
      addTodo();
    });
  
    // Initial setup for existing items to have delete functionality
    const initialItems = todoList.querySelectorAll('li');
    initialItems.forEach(item => {
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'x';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        item.remove();
        updateItemCount();
        saveTodos();
      });
      item.appendChild(deleteButton);
    });
  
    // Load todos from local storage when the page loads
    loadTodos();
  });
  