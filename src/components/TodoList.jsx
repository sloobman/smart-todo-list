import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import FilterButtons from './FilterButtons';
import { addTodo, getTodos, updateTodo, deleteTodo } from '../services/db';
import NotificationButton from './NotificationButton';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const loadTodos = async () => {
      const loadedTodos = await getTodos();
      setTodos(loadedTodos);
    };
    loadTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      const todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
        createdAt: new Date()
      };
      await addTodo(todo);
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  const handleToggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await updateTodo(updatedTodo);
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    }
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>Умный список задач</h1>
      <NotificationButton />
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу"
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Добавить</button>
      </div>
      <FilterButtons filter={filter} setFilter={setFilter} />
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;