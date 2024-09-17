
import React, { useState, useEffect } from 'react';

const API_URL = 'https://playground.4geeks.com/contact';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchTasks();
    checkUser();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const checkUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const users = await response.json();
      const yaraUser = users.find(u => u.name === 'Yara');
      if (yaraUser) {
        setUser(yaraUser);
      } else {
        createUser();
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Yara' })
      });
      const newUser = await response.json();
      setUser(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, { id: Date.now(), text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
      await updateTasksOnServer(updatedTasks);
    }
  };

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    await updateTasksOnServer(updatedTasks);
  };

  const clearAllTasks = async () => {
    setTasks([]);
    await updateTasksOnServer([]);
  };

  const updateTasksOnServer = async (updatedTasks) => {
    try {
      await fetch(`${API_URL}/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTasks)
      });
    } catch (error) {
      console.error('Error updating tasks on server:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>TODO List</h1>
      {user && <p>Usuario: {user.name}</p>}
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Eliminar</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea"
          style={{ width: '70%', padding: '5px' }}
        />
        <button onClick={addTask} style={{ marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Agregar</button>
      </div>
      <button onClick={clearAllTasks} style={{ width: '100%', marginTop: '20px', backgroundColor: '#008CBA', color: 'white', border: 'none', padding: '10px', cursor: 'pointer' }}>Limpiar todas las tareas</button>
    </div>
  );
}