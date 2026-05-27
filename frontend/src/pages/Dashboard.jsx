import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS, createAuthHeaders, apiClient } from '../config/api';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    fetchTasks(controller.signal);
    return () => controller.abort();
  }, []);

  const fetchTasks = async (signal) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await apiClient.get(API_ENDPOINTS.TASKS.GET_ALL, {
        headers: createAuthHeaders(),
        signal
      });
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      if (error.name === 'AbortError') return;
      setError('Failed to fetch tasks');
      setLoading(false);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(API_ENDPOINTS.TASKS.CREATE, newTask, {
        headers: createAuthHeaders()
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: '', description: '', priority: 'medium' });
    } catch (error) {
      setError('Failed to create task');
    }
  };

  const toggleComplete = async (taskId, completed) => {
    try {
      const response = await apiClient.put(API_ENDPOINTS.TASKS.UPDATE(taskId), 
        { completed: !completed },
        { headers: createAuthHeaders() }
      );
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (error) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await apiClient.delete(API_ENDPOINTS.TASKS.DELETE(taskId), {
        headers: createAuthHeaders()
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Task Manager Dashboard</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        <div className="task-form-section">
          <h2>Create New Task</h2>
          <form onSubmit={createTask} className="task-form">
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Task description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="tasks-section">
          <div className="filter-controls">
            <h2>Your Tasks ({filteredTasks.length})</h2>
            <div className="filter-buttons">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={filter === 'pending' ? 'active' : ''} 
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={filter === 'completed' ? 'active' : ''} 
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="tasks-list">
            {filteredTasks.length === 0 ? (
              <div className="no-tasks">No tasks found. Create your first task!</div>
            ) : (
              filteredTasks.map(task => (
                <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority || 'medium'}`}>
                  <div className="task-content">
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    <div className="task-meta">
                      <span className={`priority-badge priority-${task.priority || 'medium'}`}>
                        {task.priority || 'medium'} priority
                      </span>
                      <span className="task-date">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button 
                      onClick={() => toggleComplete(task._id, task.completed)}
                      className={`toggle-btn ${task.completed ? 'undo' : 'complete'}`}
                    >
                      {task.completed ? '↩️ Undo' : '✅ Complete'}
                    </button>
                    <button 
                      onClick={() => deleteTask(task._id)}
                      className="delete-btn"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
