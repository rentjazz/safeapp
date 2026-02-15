# Déploiement Dashboard Safe HDF

## 1. Créer le repo GitHub
Aller sur https://github.com/new et créer un repo nommé `dashboard-safehdf`

## 2. Pousser le code
```bash
cd /data/.openclaw/workspace/dashboard-safehdf
git branch -M main
git remote add origin https://github.com/rentjazz/dashboard-safehdf.git
git push -u origin main
```

## 3. Cloner sur le VPS
```bash
ssh user@vps
cd /opt
git clone https://github.com/rentjazz/dashboard-safehdf.git
cd dashboard-safehdf
```

## 4. Configurer les variables d'environnement
```bash
cat > .env << EOF
GOOGLE_CLIENT_ID=ton_id_client
GOOGLE_CLIENT_SECRET=ton_code_secret
GOOGLE_API_KEY=ta_cle_api
EOF
```

## 5. Lancer avec Docker
```bash
docker-compose up -d --build
```

## 6. Accéder au Dashboard
http://vps-ip:3001

## 7. (Optionnel) Reverse Proxy avec Nginx
Pour utiliser un nom de domaine :
```nginx
server {
    listen 80;
    server_name dashboard.safehdf.com;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
