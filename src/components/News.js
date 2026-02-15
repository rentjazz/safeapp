import React, { useState, useEffect } from 'react';
import { 
  Rss, 
  ExternalLink, 
  Clock,
  RefreshCw,
  Newspaper
} from 'lucide-react';

// Mock data pour démonstration
const mockNews = [
  {
    id: 1,
    title: 'Nouvelle norme EN 1143-1 pour les coffres-forts',
    excerpt: 'La norme européenne a été mise à jour avec de nouvelles exigences de résistance aux effractions. Impact sur les fabricants et installateurs.',
    source: 'Fédération Serruriers',
    date: '2026-02-14T10:30:00',
    category: 'Réglementation',
    emoji: '📋'
  },
  {
    id: 2,
    title: 'Fichet Bauche lance sa nouvelle gamme de coffres connectés',
    excerpt: 'La marque française dévoile une série de coffres-forts équipés de serrures électroniques haute sécurité avec monitoring à distance.',
    source: 'BatiActu',
    date: '2026-02-13T14:15:00',
    category: 'Produits',
    emoji: '🔐'
  },
  {
    id: 3,
    title: 'Hausse des cambriolages : les coffres-forts en forte demande',
    excerpt: 'Selon les chiffres de la police nationale, les demandes d\'installation de coffres-forts ont augmenté de 23% sur l\'année écoulée.',
    source: 'Le Figaro',
    date: '2026-02-12T09:00:00',
    category: 'Actualité',
    emoji: '📈'
  },
  {
    id: 4,
    title: 'Tutoriel : Comment entretenir son coffre-fort mécanique',
    excerpt: 'Guide pratique pour la maintenance préventive des serrures à disques et des mécanismes de coffres anciens.',
    source: 'Safe HDF Blog',
    date: '2026-02-11T16:45:00',
    category: 'Conseils',
    emoji: '🛠️'
  },
  {
    id: 5,
    title: 'Salon SecuTech Paris 2026 : les innovations sécurité',
    excerpt: 'Retour sur les nouveautés présentées au salon professionnel : biométrie, serrures connectées, solutions anti-intrusion.',
    source: 'Sécurité Mag',
    date: '2026-02-10T11:20:00',
    category: 'Événement',
    emoji: '🏢'
  },
  {
    id: 6,
    title: 'Alerte : Nouvelle technique de crochetage détectée',
    excerpt: 'Les professionnels signalent l\'apparition d\'une nouvelle méthode d\'effraction ciblant les serrures bas de gamme.',
    source: 'Serruriers de France',
    date: '2026-02-09T08:30:00',
    category: 'Alerte',
    emoji: '⚠️'
  }
];

const categories = {
  'Réglementation': '#4facfe',
  'Produits': '#8b5cf6',
  'Actualité': '#22c55e',
  'Conseils': '#f97316',
  'Événement': '#ec4899',
  'Alerte': '#ef4444'
};

function News() {
  const [news, setNews] = useState(mockNews);
  const [filter, setFilter] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshNews = () => {
    setIsRefreshing(true);
    // Simulation d'un appel API/n8n
    setTimeout(() => {
      setLastUpdate(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.category === filter);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000; // seconds

    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="news-dashboard">
      {/* Header with refresh */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '12px', 
              background: 'rgba(79, 172, 254, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#4facfe'
            }}>
              <Rss size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '18px', marginBottom: '4px' }}>
                Flux d'actualités
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                <Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />
                Dernière mise à jour : {formatDate(lastUpdate.toISOString())}
              </div>
            </div>
          </div>
          <button
            onClick={refreshNews}
            disabled={isRefreshing}
            style={{
              padding: '12px 20px',
              borderRadius: '10px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500
            }}
          >
            <RefreshCw size={16} className={isRefreshing ? 'spin' : ''} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="site-tabs" style={{ marginBottom: '24px', flexWrap: 'wrap' }}>
        <button 
          className={`site-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tout ({news.length})
        </button>
        {Object.keys(categories).map(cat => (
          <button 
            key={cat}
            className={`site-tab ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat} ({news.filter(n => n.category === cat).length})
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.map((item) => (
          <div key={item.id} className="news-card">
            <div 
              className="news-image" 
              style={{ 
                background: `linear-gradient(135deg, ${categories[item.category]}40 0%, ${categories[item.category]}20 100%)`,
                borderBottom: `3px solid ${categories[item.category]}`
              }}
            >
              <span style={{ fontSize: '64px' }}>{item.emoji}</span>
            </div>
            <div className="news-content">
              <div className="news-source" style={{ color: categories[item.category] }}>
                {item.category} • {item.source}
              </div>
              <h3 className="news-title">{item.title}</h3>
              <p className="news-excerpt">{item.excerpt}</p>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                marginTop: '16px'
              }}>
                <span className="news-date">
                  <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {formatDate(item.date)}
                </span>
                <button style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-blue)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '13px',
                  fontWeight: 500
                }}>
                  Lire <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px', color: 'var(--text-secondary)' }}>
          <Newspaper size={64} style={{ marginBottom: '16px', opacity: 0.3 }} />
          <p>Aucune actualité dans cette catégorie</p>
        </div>
      )}

      {/* n8n Integration Info */}
      <div className="card" style={{ marginTop: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            background: 'rgba(249, 115, 22, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Intégration n8n</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              Workflow RSS à configurer • Endpoint webhook prêt
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              background: 'rgba(249, 115, 22, 0.15)',
              color: '#f97316',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600
            }}>
              À configurer
            </span>
          </div>
        </div>
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '10px',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
            // Webhook endpoint pour n8n
          </div>
          <div style={{ color: '#22c55e' }}>
            POST /api/webhook/news
          </div>
          <div style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            {'{ title, excerpt, source, url, category }'}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default News;