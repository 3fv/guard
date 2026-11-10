# `@3fv/guard` type guards

A library which helps typing with
basic guards and simple extensions for
creating new ones

## `guard`

Guard against both `sync` and `async` functions & results
from exceptions.

### `guard.lift`

Lift a function, making it guarded

## Commands

[pnpm](https://pnpm.io) is the package manager, at the version pinned by the
`packageManager` field of `package.json`.

| Command            | What it does                                                    |
| ------------------ | --------------------------------------------------------------- |
| `pnpm install`     | Installs dependencies from `pnpm-lock.yaml`                     |
| `pnpm build`       | Compiles `src/` to `lib/esm` and `lib/cjs` (`tsc -b`)           |
| `pnpm build:watch` | Same, in watch mode                                             |
| `pnpm test`        | Runs jest over the compiled specs in `lib/cjs` (build first)    |
| `pnpm test:dev`    | Builds, then runs the build and the tests in watch mode         |
| `pnpm release`     | Starts the GitHub Actions release workflow (patch bump)         |

`pnpm-workspace.yaml` denies the `@swc/core` install script; its native binary
comes from its optional dependencies.

To use a local checkout from another project, run `pnpm link /path/to/guard` in
that project after `pnpm build` here.

## Releasing

Releases run entirely in GitHub Actions (`.github/workflows/release.yml`),
started by `pnpm release` or by
`gh workflow run release.yml --ref master -f bump=<patch|minor|major|none>` (add
`-f dist-tag=<tag>` to publish under a tag other than `latest`):

1. The `version` job runs `pnpm version`, which builds and tests the package
   (`preversion`), commits and tags `vX.Y.Z`, and pushes both to `master`.
2. The `publish` job checks out that tag, builds it and runs `npm publish`
   through npm trusted publishing, so no npm token or two-factor prompt is
   involved. If it fails, re-run that job alone: it publishes the same tag.

`bump=none` publishes the version already in `package.json` at the dispatched
commit without bumping or tagging.

Trusted publishing needs a one-time registration of the workflow on npm:

    npm trust github @3fv/guard --repo 3fv/guard --file release.yml --allow-publish
