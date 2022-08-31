#!/bin/bash
cd "$(dirname "$0")"

if [[ $1 =~ ^[0-9]+\.[0-9]+(\.[0-9])?$ ]]; then
  VER="$1"
  TAG="latest"
  SUFFIX=""
fi

if [[ $1 =~ ^[0-9]+\.[0-9]+$ ]]; then
  VER="$VER.0"
fi

if [[ $1 =~ ^[0-9]+$ ]]; then
  RAND=`tr -dc A-Za-z0-9 </dev/urandom | head -c 6 ; echo ''`
  VER="0.0.$1-SNAPSHOT.$RAND"
  TAG="$1-SNAPSHOT"
  SUFFIX="-$1"
fi

if [[ $1 == "snapshot" ]]; then
  RAND=`tr -dc A-Za-z0-9 </dev/urandom | head -c 6 ; echo ''`
  VER="0.0.0-SNAPSHOT.$RAND"
  TAG="1.0.0-SNAPSHOT"
  SUFFIX="-preview"
fi

echo "Version: $VER, $TAG"

# Build the packages
# ui
cd lib/ui
yarn
echo "//${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}">>.npmrc
yarn version --new-version $VER
yarn build:npm
yarn publish "./dist/flowstorm-bot-ui-$VER.tgz" --new-version $VER --tag $TAG

# service
cd ../service
yarn
echo "//${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}">>.npmrc
yarn version --new-version $VER
yarn build:npm
yarn publish "./dist/flowstorm-bot-service-$VER.tgz" --new-version $VER --tag $TAG

# app
cd ../../app
sed -i -- "s/#env#/$SUFFIX/g" src/main.js
sed -i -- "s/\"@flowstorm\/bot\-ui\": \"latest\"/\"@flowstorm\/bot\-ui\": \"${TAG}\"/g" package.json
sed -i -- "s/\"@flowstorm\/bot\-service\": \"latest\"/\"@flowstorm\/bot\-service\": \"${TAG}\"/g" package.json
yarn install

echo "//${CI_SERVER_HOST}/api/v4/projects/${CI_PROJECT_ID}/packages/npm/:_authToken=${CI_JOB_TOKEN}">>.npmrc
yarn version --new-version $VER
yarn build:npm
yarn publish "./dist/flowstorm-client-$VER.tgz" --new-version $VER --tag $TAG

# Build the client
yarn build
cp -R public/.well-known dist/

cd ../lib/ui
yarn build
cp -r ./dist ../../app/dist/ui

cd ../service
CI=false yarn build
cp ./dist/bot-service.js ../../app/dist/service.js