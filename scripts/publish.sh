#!/bin/bash -e

yarn build 
yarn test 
yarn version --patch --non-interactive 
cp package.json lib/package.json 
cd lib

yarn publish --no-git-tag-version --no-commit-hooks  --non-interactive 