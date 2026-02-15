import React, { useState } from 'react';
import { 
  Globe, 
  MousePointer, 
  Eye, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Search
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const sites = [
  { id: 'france', name: 'safehdf.com', url: 'safehdf.com', flag: '🇫🇷' },
  { id: 'region', name: 'coffrefort.safehdf.com', url: 'coffrefort.safehdf.com', flag: '🇫🇷' },
  { id: 'belgium', name: 'safehdf.be', url: 'safehdf.be', flag: '🇧🇪' },
];

const mockData = {
  france: {
    clicks: 1254,
    impressions: 45200,
    ctr: 2.77,
    position: 12.4,
    clicksTrend: '+15.3%',
    impressionsTrend: '+8.7%',
    history: [
      { date: 'Sem 1', clicks: 280, impressions: 9800 },
      { date: 'Sem 2', clicks: 310, impressions: 10500 },
      { date: 'Sem 3', clicks: 295, impressions: 11200 },
      { date: 'Sem 4', clicks: 369, impressions: 13700 },
    ],
    topPages: [
      { path: '/depannage-coffre-fort', clicks: 342, impressions: 5200 },
      { path: '/ouverture-coffre-fort', clicks: 298, impressions: 4100 },
      { path: '/serrurier-coffre-fort', clicks: 245, impressions: 3800 },
      { path: '/reparation-coffre-fort', clicks: 189, impressions: 2900 },
    ],
    topQueries: [
      { query: 'dépannage coffre fort lille', clicks: 156, impressions: 2100 },
      { query: 'ouverture coffre fort', clicks: 134, impressions: 1850 },
      { query: 'serrurier coffre fort', clicks: 112, impressions: 1650 },
    ]
  },
  region: {
    clicks: 687,
    impressions: 28400,
    ctr: 2.42,
    position: 14.2,
    clicksTrend: '+9.8%',
    impressionsTrend: '+5.2%',
    history: [
      { date: 'Sem 1', clicks: 150, impressions: 6200 },
      { date: 'Sem 2', clicks: 165, impressions: 6800 },
      { date: 'Sem 3', clicks: 178, impressions: 7200 },
      { date: 'Sem 4', clicks: 194, impressions: 8200 },
    ],
    topPages: [
      { path: '/coffre-fort-hauts-de-france', clicks: 245, impressions: 4200 },
      { path: '/serrurier-douai', clicks: 198, impressions: 3100 },
      { path: '/depannage-valenciennes', clicks: 134, impressions: 2400 },
    ],
    topQueries: [
      { query: 'coffre fort hauts de france', clicks: 89, impressions: 1200 },
      { query: 'serrurier coffre douai', clicks: 76, impressions: 980 },
      { query: 'dépannage coffre valenciennes', clicks: 65, impressions: 850 },
    ]
  },
  belgium: {
    clicks: 423,
    impressions: 15600,
    ctr: 2.71,
    position: 11.8,
    clicksTrend: '+22.1%',
    impressionsTrend: '+14.5%',
    history: [
      { date: 'Sem 1', clicks: 85, impressions: 3200 },
      { date: 'Sem 2', clicks: 98, impressions: 3600 },
      { date: 'Sem 3', clicks: 112, impressions: 4100 },
      { date: 'Sem 4', clicks: 128, impressions: 4700 },
    ],
    topPages: [
      { path: '/depannage-coffre-belgique', clicks: 178, impressions: 2900 },
      { path: '/serrurier-coffre-bruxelles', clicks: 134, impressions: 2100 },
      { path: '/ouverture-coffre-belgique', clicks: 111, impressions: 1800 },
    ],
    topQueries: [
      { query: 'dépannage coffre fort belgique', clicks: 67, impressions: 920 },
      { query: 'serrurier coffre bruxelles', clicks: 54, impressions: 780 },
      { query: 'ouverture coffre belgique', clicks: 48, impressions: 650 },
    ]
  }
};

const COLORS = ['#4facfe', '#8b5cf6', '#f97316', '#22c55e'];

function SEO() {
  const [activeSite, setActiveSite] = useState('france');
  const data = mockData[activeSite];

  return (
    <div className="seo-dashboard">
      {/* Site Selector */}
      <div className="site-tabs">
        {sites.map((site) => (
          <button
            key={site.id}
            className={`site-tab ${activeSite === site.id ? 'active' : ''}`}
            onClick={() => setActiveSite(site.id)}
          >
            <span style={{ marginRight: '8px' }}>{site.flag}</span>
            {site.name}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card blue">
          <div className="kpi-icon blue">
            <MousePointer size={24} />
          </div>
          <div className="kpi-value">{data.clicks.toLocaleString()}</div>
          <div className="kpi-label">Clics (28j)</div>
          <div className="kpi-trend up">
            <TrendingUp size={14} />
            {data.clicksTrend}
          </div>
        </div>

        <div className="kpi-card purple">
          <div className="kpi-icon purple">
            <Eye size={24} />
          </div>
          <div className="kpi-value">{data.impressions.toLocaleString()}</div>
          <div className="kpi-label">Impressions (28j)</div>
          <div className="kpi-trend up">
            <TrendingUp size={14} />
            {data.impressionsTrend}
          </div>
        </div>

        <div className="kpi-card orange">
          <div className="kpi-icon orange">
            <TrendingUp size={24} />
          </div>
          <div className="kpi-value">{data.ctr}%</div>
          <div className="kpi-label">CTR moyen</div>
          <div className="kpi-trend up">
            <CheckCircle size={14} />
            Stable
          </div>
        </div>

        <div className="kpi-card green">
          <div className="kpi-icon green">
            <Search size={24} />
          </div>
          <div className="kpi-value">{data.position}</div>
          <div className="kpi-label">Position moyenne</div>
          <div className="kpi-trend up">
            <TrendingUp size={14} />
            En progrès
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Évolution des clics</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data.history}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="clicks" 
                stroke="#4facfe" 
                strokeWidth={3}
                dot={{ fill: '#4facfe', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3 className="chart-title">Pages les plus performantes</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data.topPages} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} />
              <YAxis 
                dataKey="path" 
                type="category" 
                stroke="var(--text-secondary)" 
                fontSize={11}
                width={150}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="clicks" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Queries */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Requêtes principales</span>
          <Search size={18} color="var(--text-secondary)" />
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {data.topQueries.map((query, index) => (
            <div key={index} className="list-item">
              <div className="list-icon" style={{ 
                background: `${COLORS[index % COLORS.length]}20`, 
                color: COLORS[index % COLORS.length] 
              }}>
                <span style={{ fontWeight: 600 }}>#{index + 1}</span>
              </div>
              <div className="list-content">
                <div className="list-title">{query.query}</div>
                <div className="list-meta">{query.impressions.toLocaleString()} impressions</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, color: 'var(--accent-green)' }}>
                  {query.clicks} clics
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {((query.clicks / query.impressions) * 100).toFixed(1)}% CTR
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Indicators */}
      <div className="charts-grid" style={{ marginTop: '24px' }}>
        <div className="card">
          <div className="card-header">
            <span className="card-title">État des sites</span>
            <Globe size={18} color="var(--text-secondary)" />
          </div>
          {sites.map((site) => (
            <div key={site.id} className="list-item">
              <div className="list-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                <CheckCircle size={20} />
              </div>
              <div className="list-content">
                <div className="list-title">{site.name}</div>
                <div className="list-meta">Indexé par Google</div>
              </div>
              <span style={{ 
                background: 'rgba(34, 197, 94, 0.15)', 
                color: '#22c55e',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600
              }}>
                Actif
              </span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">Alertes</span>
            <AlertCircle size={18} color="var(--accent-orange)" />
          </div>
          <div className="list-item" style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
            <div className="list-icon" style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#f97316' }}>
              <AlertCircle size={20} />
            </div>
            <div className="list-content">
              <div className="list-title">Pages non indexées</div>
              <div className="list-meta">3 pages nécessitent une attention</div>
            </div>
          </div>
          <div className="list-item">
            <div className="list-icon" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
              <CheckCircle size={20} />
            </div>
            <div className="list-content">
              <div className="list-title">Core Web Vitals</div>
              <div className="list-meta">Tous les scores sont bons</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SEO;