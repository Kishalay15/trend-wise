#!/usr/bin/env bash

# Install Chromium
apt-get update && apt-get install -y chromium

chromium --version

# Install Node.js dependencies
npm install
