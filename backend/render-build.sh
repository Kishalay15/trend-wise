#!/usr/bin/env bash

echo "🛠️ Running render-build.sh..."

# Optional: Use a custom cache path (good for Render)
export PUPPETEER_CACHE_DIR="./.cache/puppeteer"

# Install all dependencies (includes Puppeteer)
npm install
echo "✅ Dependencies installed"

# 👉 Force Puppeteer to download Chromium now
node -e "import('puppeteer').then(p => p.default.launch({ headless: 'new' }).then(b => b.close()).catch(console.error))"

echo "✅ Puppeteer Chromium ensured"
