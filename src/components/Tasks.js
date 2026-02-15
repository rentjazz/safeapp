import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Flag,
  Check,
  Clock
} from 'lucide-react';

const initialTasks = [
  { 
    id: 1, 
    title: 'Rappeler client urgent', 
    completed: false, 
    priority: 'high',
    date: '2026-02-15',
    category: 'Appels'
  },
  { 
    id: 2, 
    title: 'Devis à envoyer', 
    completed: false, 
    priority: 'medium',
    date: '2026-02-15',
    category: 'Admin'
  },
  { 
    id: 3, 
    title: 'Répondre aux emails', 
    completed: true, 
    priority: 'low',
    date: '2026-02-14',
    category: 'Emails'
  },
  { 
    id: 4, 
    title: 'Factures à établir', 
    completed: false, 
    priority: 'high',
    date: '2026-02-16',
    category: 'Compta'
  },
  { 
    id: 5, 
    title: 'Préparer intervention Lille', 
    completed: false, 
    priority: 'medium',
    date: '2026-02-17',
    category: 'Terrain'
  },
  { 
    id: 6, 
    title: 'Commander pièces détachées', 
    completed: true, 
    priority: 'low',
    date: '2026-02-13',
    category: 'Stock'
  },
];

const categories = {
  'Appels': '#ef4444',
  'Admin': '#f97316',
  'Emails': '#8b5cf6',
  'Compta': '#22c55e',
  'Terrain': '#4facfe',
  'Stock': '#a855f7'
};

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        title: newTask,
        completed: false,
        priority: selectedPriority,
        date: new Date().toISOString().split('T')[0],
        category: 'Admin'
      };
      setTasks([task, ...tasks]);
      setNewTask('');
      setShowAddForm(false);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    high: tasks.filter(t => t.priority === 'high' && !t.completed).length
  };

  return (
    <div className="tasks-dashboard">
      {/* Stats */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card blue">
          <div className="kpi-value">{stats.total}</div>
          <div className="kpi-label">Total tâches</div>
        </div>
        <div className="kpi-card green">
          <div className="kpi-value">{stats.completed}</div>
          <div className="kpi-label">Terminées</div>
        </div>
        <div className="kpi-card orange">
          <div className="kpi-value">{stats.pending}</div>
          <div className="kpi-label">En attente</div>
        </div>
        <div className="kpi-card purple">
          <div className="kpi-value">{stats.high}</div>
          <div className="kpi-label">Prioritaires</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="site-tabs" style={{ marginTop: '24px', marginBottom: '24px' }}>
        <button 
          className={`site-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Toutes ({stats.total})
        </button>
        <button 
          className={`site-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          En attente ({stats.pending})
        </button>
        <button 
          className={`site-tab ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Terminées ({stats.completed})
        </button>
      </div>

      {/* Add Task Form */}
      {showAddForm ? (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nouvelle tâche..."
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
            <button
              onClick={addTask}
              style={{
                padding: '12px 24px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--accent-blue)',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Ajouter
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'transparent',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <button className="add-task-btn" onClick={() => setShowAddForm(true)}>
          <Plus size={20} />
          Ajouter une tâche
        </button>
      )}

      {/* Tasks List */}
      <div className="card">
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
            <Check size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>Aucune tâche {filter === 'completed' ? 'terminée' : filter === 'pending' ? 'en attente' : ''}</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <div 
                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.completed && <Check size={14} color="white" />}
              </div>
              <div className="task-content">
                <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </div>
                <div className="task-date">
                  <Calendar size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {new Date(task.date).toLocaleDateString('fr-FR')}
                  <span style={{ marginLeft: '12px', color: categories[task.category] }}>
                    {task.category}
                  </span>
                </div>
              </div>
              <span className={`task-priority ${task.priority}`}>
                <Flag size={10} style={{ marginRight: '4px', display: 'inline' }} />
                {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
              </span>
              <button 
                className="list-action"
                onClick={() => deleteTask(task.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Google Tasks Sync Info */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            background: 'rgba(34, 197, 94, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#22c55e'
          }}>
            <Clock size={24} />
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Synchronisation Google Tasks</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Dernière synchro : il y a 2 minutes • Liste "Safe HDF - Gestion"
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              Connecté
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;