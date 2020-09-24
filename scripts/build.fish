#!/usr/bin/env fish

if ! test -e index.d.ts
  if test -d lib && test "$NODE_ENV" = "production"
    echo echo "$PWD/lib cleaned"
    rm -Rf lib
  end
  mkdir -p lib
  cp package.json lib
  set tscArgs -b tsconfig.json $argv --preserveWatchOutput

  echo "Building with args: $tscArgs"
  tsc $tscArgs

  echo "$PWD/lib successfully built"
end
