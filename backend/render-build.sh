#!/usr/bin/env bash

echo "🛠️ Running render-build.sh..."

# Set Puppeteer cache path
export PUPPETEER_CACHE_DIR="./.cache/puppeteer"

# Install dependencies
npm install
echo "✅ Dependencies installed"

# ✅ Force Chromium download
npx puppeteer browsers install chrome
echo "✅ Chromium downloaded manually"

# (Optional) verify
npx puppeteer browsers list
