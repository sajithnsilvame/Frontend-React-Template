import React, { useEffect, useState } from 'react';
import { Todo } from '../Types/Todo';
import { getTodoService } from '../DI/Container';

const todoService = getTodoService();

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const fetchedTodos = showCompleted 
        ? await todoService.getCompletedTodos()
        : await todoService.getAllTodos();
      setTodos(fetchedTodos);
      setError(null);
    } catch {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  // Add effect to reload todos when filter changes
  useEffect(() => {
    loadTodos();
  }, [showCompleted]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const newTodo = await todoService.createTodo(newTodoTitle);
      if (!showCompleted) {
        setTodos([...todos, newTodo]);
      }
      setNewTodoTitle('');
      setError(null);
    } catch {
      setError('Failed to add todo');
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const updatedTodo = await todoService.toggleTodoComplete(id);
      if (showCompleted) {
        // If showing only completed, remove the todo if it's uncompleted
        setTodos(todos.filter(todo => 
          todo.id === id ? updatedTodo.completed : todo.completed
        ));
      } else {
        setTodos(todos.map(todo => 
          todo.id === id ? updatedTodo : todo
        ));
      }
      setError(null);
    } catch {
      setError('Failed to toggle todo');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
      setError(null);
    } catch {
      setError('Failed to delete todo');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex items-center mb-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
            className="mr-2"
          />
          Show completed only
        </label>
      </div>

      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add new todo"
          className="border p-2 rounded mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Todo
        </button>
      </form>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="mr-2"
              />
              <span className={todo.completed ? 'line-through' : ''}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 