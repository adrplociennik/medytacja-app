#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -eq 0 ]]; then
  echo "Uruchom jako zwykły użytkownik z dostępem do sudo, nie bezpośrednio jako root."
  exit 1
fi

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOMAIN="${1:-_}"
TARGET="/var/www/still"

sudo apt-get update
sudo apt-get install -y nginx curl

chmod +x "$ROOT/scripts/download-audio.sh"
"$ROOT/scripts/download-audio.sh"

sudo mkdir -p "$TARGET"
sudo rm -rf "$TARGET"/*
sudo cp "$ROOT/index.html" "$ROOT/styles.css" "$ROOT/app.js" "$ROOT/manifest.webmanifest" "$ROOT/sw.js" "$TARGET/"
sudo cp -r "$ROOT/assets" "$ROOT/audio" "$TARGET/"
sudo chown -R www-data:www-data "$TARGET"
sudo find "$TARGET" -type d -exec chmod 755 {} \;
sudo find "$TARGET" -type f -exec chmod 644 {} \;

sed "s/__SERVER_NAME__/$DOMAIN/g" "$ROOT/deploy/nginx.conf" | sudo tee /etc/nginx/sites-available/still >/dev/null
sudo ln -sfn /etc/nginx/sites-available/still /etc/nginx/sites-enabled/still
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl enable nginx
sudo systemctl reload nginx

echo
echo "Still wdrożone do $TARGET"
echo "Nginx działa dla server_name: $DOMAIN"
echo
echo "PWA wymaga HTTPS poza localhostem. Jeśli masz domenę, skonfiguruj certyfikat TLS (np. certbot)."
