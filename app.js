document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('simpleList');
    const itemCount = document.querySelector('.footer .count span');
    
    // Function to update the item count
    function updateItemCount() {
      const totalItems = todoList.querySelectorAll('li').length;
      itemCount.textContent = totalItems;
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
      });
      
      li.appendChild(deleteButton);
      return li;
    }
    
    // Add new todo item
    todoInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' && todoInput.value.trim() !== '') {
        const newTodo = createTodoItem(todoInput.value.trim());
        todoList.appendChild(newTodo);
        todoInput.value = '';
        updateItemCount();
      }
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
      });
      item.appendChild(deleteButton);
    });
  
    updateItemCount();
  });
  