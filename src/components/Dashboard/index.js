import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';  // Importando o CSS externo

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Função para buscar as tarefas do backend
  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://185.139.1.231:3333/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }, [token]);  // Inclui 'token' nas dependências para evitar warnings

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) {
      alert('A tarefa não pode estar vazia');
      return;
    }
    try {
      await axios.post(
        'http://185.139.1.231:3333/tasks',
        { task: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewTask('');
      setIsModalOpen(false);
      fetchTasks(); // Atualiza a lista de tarefas
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      alert('Erro ao adicionar a tarefa, tente novamente.');
    }
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Buscar tarefas ao carregar o componente
  useEffect(() => {
    fetchTasks();  // Chama a função fetchTasks
  }, [fetchTasks]);  // Inclui fetchTasks como dependência para evitar warnings

  return (
    <div className="dashboard">
      <div className="progress-container">
        <div className="header">
          <p className="header-text">Task Manager</p>
          <button onClick={handleLogout} className="logout-button">Logout</button> {/* Adiciona o botão de logout */}
        </div>
        
        <div className="progress-section">
          <p className="progress-text">Progress</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${(tasks.length / 15) * 100}%` }}
            ></div>
          </div>
          <p className="progress-percentage">
            {Math.min((tasks.length / 15) * 100, 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Lista de Tarefas */}
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            {task.task}
          </div>
        ))}
        <button
          className="add-task-button"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>

      {/* Modal para adicionar nova tarefa */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Adicionar Nova Tarefa</h2>
            <form onSubmit={addTask}>
              <input
                type="text"
                placeholder="Digite a nova tarefa"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button type="submit">Adicionar</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
