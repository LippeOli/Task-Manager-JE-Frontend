import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';
import './styles.css'; // Importando o CSS externo

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem('token');

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
  }, [token]);

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

  // Função para remover tarefa
  const removeTask = async (id) => {
    try {
      await axios.delete(`http://185.139.1.231:3333/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTasks(); // Atualiza a lista após remoção
    } catch (error) {
      console.error('Erro ao remover tarefa:', error);
    }
  };

  // Função para marcar a tarefa como concluída
  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(
        `http://185.139.1.231:3333/tasks/${id}`,
        { completed: !completed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks(); // Atualiza a lista após alteração
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  // Buscar tarefas ao carregar o componente
  useEffect(() => {
    fetchTasks(); // Chama a função fetchTasks
  }, [fetchTasks]);

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Task Manager</h2>
        <p className="subtitle">{tasks.length} tasks</p>
      </div>

      <ul className="taskList">
        {tasks.map((task) => (
          <li key={task.id} className="taskCard">
            <div className="taskTextContainer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id, task.completed)}
                className="checkbox"
              />
              <span className={task.completed ? "taskCompleted" : "taskText"}>{task.task}</span>
            </div>
            <button onClick={() => removeTask(task.id)} className="deleteButton">
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>

      {/* Botão para abrir o modal */}
      <button className="addButton" onClick={() => setIsModalOpen(true)}>
        <FaPlus />
      </button>

      {/* Modal para adicionar tarefa */}
      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>New Task</h3>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="modalInput"
              placeholder="Enter your task"
            />
            <div className="modalActions">
              <button onClick={addTask} className="modalAddButton">
                Add Task
              </button>
              <button onClick={() => setIsModalOpen(false)} className="modalCloseButton">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
