# Dashboard Safe HDF

Dashboard de gestion pour Safe HDF - Dépannage et réparation de coffres-forts.

## 🚀 Fonctionnalités

### 📊 Vue d'ensemble
- KPIs principaux (visites, clics, leads, devis)
- Graphiques de trafic organique
- Tâches récentes et prochains rendez-vous
- Design moderne style "fitness app"

### 🔍 SEO (Google Search Console)
- Performance des 3 sites :
  - safehdf.com (France)
  - coffrefort.safehdf.com (Hauts-de-France)
  - safehdf.be (Belgique)
- Clics, impressions, CTR, positions
- Pages et requêtes les plus performantes
- État de l'indexation

### ✅ Tâches (Google Tasks)
- Synchronisation bidirectionnelle avec Google Tasks
- Gestion des priorités (haute/moyenne/basse)
- Filtres (toutes/en attente/terminées)
- Catégorisation (Appels, Admin, Emails, Compta, Terrain, Stock)

### 📰 Actualités (RSS via n8n)
- Flux RSS agrégés via webhook n8n
- Catégories : Réglementation, Produits, Actualité, Conseils, Événement, Alerte
- Filtrage par catégorie
- Mise à jour en temps réel

## 🎨 Design
- Interface sombre moderne
- Cards avec gradients colorés
- Graphiques interactifs (Recharts)
- Responsive design
- Logo officiel Safe HDF

## 🛠️ Technologies
- React 18
- CSS personnalisé (pas de framework UI)
- Recharts pour les graphiques
- Lucide React pour les icônes

## 📦 Installation

```bash
# Cloner le projet
cd dashboard-safehdf

# Installer les dépendances
npm install

# Lancer en mode développement
npm start

# Build pour production
npm run build
```

## 🔌 Intégrations à configurer

### Google Tasks
- Authentification OAuth2 (ID client + Code secret)
- Liste "Safe HDF - Gestion"

### Google Search Console
- API avec accès aux 3 propriétés
- Refresh automatique des données

### n8n (Actualités)
- Workflow à créer pour l'agrégation RSS
- Endpoint webhook : `POST /api/webhook/news`

## 📁 Structure
```
dashboard-safehdf/
├── public/
│   ├── assets/
│   │   └── logo-safehdf.png    # Logo officiel Safe HDF
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Overview.js         # Vue d'ensemble
│   │   ├── SEO.js              # Google Search Console
│   │   ├── Tasks.js            # Gestion des tâches
│   │   └── News.js             # Actualités RSS
│   ├── App.js                  # Layout principal
│   ├── App.css                 # Styles
│   └── index.js                # Entry point
└── package.json
```

## 🔑 Variables d'environnement
```
REACT_APP_GOOGLE_CLIENT_ID=xxx
REACT_APP_GOOGLE_CLIENT_SECRET=xxx
REACT_APP_GOOGLE_API_KEY=xxx
REACT_APP_N8N_WEBHOOK_URL=xxx
```

## 📝 TODO
- [ ] Connecter l'API Google Tasks réelle
- [ ] Connecter l'API Google Search Console
- [ ] Créer le workflow n8n pour les flux RSS
- [ ] Ajouter l'authentification utilisateur
- [ ] Déployer sur le VPS

---
Créé pour Safe HDF par l'assistant IA dédié.
