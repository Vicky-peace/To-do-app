document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('simpleList');
  const itemCount = document.querySelector('.footer .count span');
  const submitButton = document.getElementById('submit-button');
  const filterButtons = document.querySelectorAll('.filters input');
  const clearCompletedButton = document.querySelector('.clear');

  // Function to update the item count
  function updateItemCount() {
    const totalItems = todoList.querySelectorAll('li:not(.completed)').length;
    itemCount.textContent = totalItems;
  }

  // Function to save todos to local storage
  function saveTodos() {
    const todos = [];
    todoList.querySelectorAll('li').forEach(item => {
      todos.push({
        text: item.querySelector('.text').textContent,
        completed: item.classList.contains('completed')
      });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Function to create a new todo item
  function createTodoItem(text, completed = false) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (completed) {
      li.classList.add('completed');
    }

    // Add checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed');
      updateItemCount();
      saveTodos();
    });

    // Add text span
    const span = document.createElement('span');
    span.classList.add('text');
    span.textContent = text;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
      li.remove();
      updateItemCount();
      saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    return li;
  }

  // Function to load todos from local storage
  function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
      const todoItem = createTodoItem(todo.text, todo.completed);
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

  // Function to filter todos
  function filterTodos(filter) {
    const allTodos = todoList.querySelectorAll('li');
    allTodos.forEach(todo => {
      switch (filter) {
        case 'all':
          todo.style.display = 'flex';
          break;
        case 'active':
          todo.style.display = todo.classList.contains('completed') ? 'none' : 'flex';
          break;
        case 'completed':
          todo.style.display = todo.classList.contains('completed') ? 'flex' : 'none';
          break;
      }
    });
  }

  // Function to clear completed todos
  function clearCompletedTodos() {
    const completedTodos = todoList.querySelectorAll('li.completed');
    completedTodos.forEach(todo => {
      todo.remove();
    });
    updateItemCount();
    saveTodos();
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

  // Filter todos based on selected filter
  filterButtons.forEach(button => {
    button.addEventListener('change', (event) => {
      filterTodos(event.target.id);
    });
  });

  // Clear completed todos on button click
  clearCompletedButton.addEventListener('click', clearCompletedTodos);

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
