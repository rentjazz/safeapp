import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  CheckSquare, 
  Newspaper,
  LogOut,
  Bell,
  Settings
} from 'lucide-react';
import Overview from './components/Overview';
import SEO from './components/SEO';
import Tasks from './components/Tasks';
import News from './components/News';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: LayoutDashboard },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'tasks', label: 'Tâches', icon: CheckSquare },
    { id: 'news', label: 'Actualités', icon: Newspaper },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'seo':
        return <SEO />;
      case 'tasks':
        return <Tasks />;
      case 'news':
        return <News />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo-container">
          <img 
            src="/assets/logo-safehdf.png" 
            alt="Safe HDF" 
            className="logo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="logo-fallback" style={{display: 'none'}}>
            <span className="logo-text-safe">SAFE</span>
            <span className="logo-text-hdf">H.D.F</span>
          </div>
        </div>
        
        <nav className="nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">
            <Settings size={20} />
            <span>Paramètres</span>
          </button>
          <button className="nav-item logout">
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>{tabs.find(t => t.id === activeTab)?.label}</h1>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="badge">3</span>
            </button>
            <div className="user-info">
              <span>Bonjour, Rémy</span>
            </div>
          </div>
        </header>
        
        <div className="content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;