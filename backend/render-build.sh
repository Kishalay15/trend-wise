# #!/usr/bin/env bash

# echo "🛠️ Running render-build.sh..."

# # Install Chromium
# apt-get update && apt-get install -y chromium
# echo "✅ Chromium installed"

# # Print version to verify
# chromium --version

# # Install Node.js dependencies
# npm install
# echo "✅ Dependencies installed"

#!/usr/bin/env bash

echo "🛠️ Running render-build.sh..."

export PUPPETEER_CACHE_DIR="./.cache/puppeteer"

# Install dependencies (includes puppeteer with Chromium)
npm install
echo "✅ Dependencies installed"
