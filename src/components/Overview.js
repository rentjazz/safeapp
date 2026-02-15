import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MousePointer,
  Eye,
  Award,
  Calendar,
  Clock,
  Briefcase,
  Phone,
  FileText,
  Euro
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const trafficData = [
  { name: 'Lun', visits: 120, clicks: 45 },
  { name: 'Mar', visits: 145, clicks: 52 },
  { name: 'Mer', visits: 138, clicks: 48 },
  { name: 'Jeu', visits: 162, clicks: 61 },
  { name: 'Ven', visits: 185, clicks: 72 },
  { name: 'Sam', visits: 95, clicks: 32 },
  { name: 'Dim', visits: 88, clicks: 28 },
];

const kpiData = [
  {
    icon: Eye,
    label: 'Visites cette semaine',
    value: '933',
    trend: '+12.5%',
    trendUp: true,
    color: 'blue'
  },
  {
    icon: MousePointer,
    label: 'Clics organiques',
    value: '338',
    trend: '+8.3%',
    trendUp: true,
    color: 'green'
  },
  {
    icon: Users,
    label: 'Nouveaux leads',
    value: '24',
    trend: '+18.2%',
    trendUp: true,
    color: 'purple'
  },
  {
    icon: Euro,
    label: 'Devis envoyés',
    value: '8',
    trend: '-5.2%',
    trendUp: false,
    color: 'orange'
  }
];

const recentTasks = [
  { icon: Phone, title: 'Rappeler M. Dupont', time: 'Il y a 2h', color: '#ef4444' },
  { icon: FileText, title: 'Devis coffre Fichet', time: 'Il y a 4h', color: '#f97316' },
  { icon: Briefcase, title: 'Intervention Lille', time: 'Demain 9h', color: '#22c55e' },
];

const upcomingEvents = [
  { title: 'Maintenance annuelle - Client A', date: '17 Fév', time: '14:00' },
  { title: 'Ouverture coffre - Urgent', date: '18 Fév', time: '09:30' },
];

function Overview() {
  return (
    <div className="overview">
      {/* KPI Cards */}
      <div className="kpi-grid">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className={`kpi-card ${kpi.color}`}>
              <div className={`kpi-icon ${kpi.color}`}>
                <Icon size={24} />
              </div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-label">{kpi.label}</div>
              <div className={`kpi-trend ${kpi.trendUp ? 'up' : 'down'}`}>
                {kpi.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {kpi.trend} vs sem. dernière
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Trafic organique</h3>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>7 derniers jours</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4facfe" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4facfe" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stroke="#4facfe" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorVisits)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Clics par jour</h3>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Comparaison hebdomadaire</span>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="clicks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="charts-grid">
        {/* Recent Tasks */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Tâches récentes</span>
            <Clock size={18} color="var(--text-secondary)" />
          </div>
          {recentTasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <div key={index} className="list-item">
                <div className="list-icon" style={{ background: `${task.color}20`, color: task.color }}>
                  <Icon size={20} />
                </div>
                <div className="list-content">
                  <div className="list-title">{task.title}</div>
                  <div className="list-meta">{task.time}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Upcoming Events */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Prochains RDV</span>
            <Calendar size={18} color="var(--text-secondary)" />
          </div>
          {upcomingEvents.map((event, index) => (
            <div key={index} className="list-item">
              <div className="list-icon" style={{ background: 'var(--gradient-blue)', color: 'white' }}>
                <Calendar size={20} />
              </div>
              <div className="list-content">
                <div className="list-title">{event.title}</div>
                <div className="list-meta">{event.date} à {event.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;