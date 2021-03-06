#!/bin/bash -ex

NPM_VERSION=${1}

if [[ -z "${NPM_VERSION}" ]];then
  echo "package version must be provided"
  exit 255
fi

git push --tags
echo Publishing

mkdir -p lib
cp README.md package.json lib/
#cd src
#find ./ -name "*.ts" | xargs -IsrcFile cp srcFile ../lib

pushd lib
npm publish --tag latest --registry=https://registry.npmjs.org
cp package.json ../
popd
git push
echo "Successfully released version ${NPM_VERSION}!"
