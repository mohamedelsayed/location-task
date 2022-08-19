#!/usr/bin/env bash
set -e
cd /var/www/
npm install
npm i -g ts-node
npm i -g typeorm
echo "Running the migrate "
npm run migrate
npm run build
npm run start
