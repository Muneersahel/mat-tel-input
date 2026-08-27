#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
smoke_dir="$(mktemp -d "${TMPDIR:-/tmp}/mat-tel-input-smoke.XXXXXX")"

cleanup() {
  rm -rf "$smoke_dir"
}
trap cleanup EXIT

cd "$repo_root"
corepack yarn nx build mat-tel-input --skipNxCache
npm pack "$repo_root/dist/libs/mat-tel-input" --pack-destination "$smoke_dir"

package_tarball="$(find "$smoke_dir" -maxdepth 1 -name 'mat-tel-input-*.tgz' -print -quit)"
if [[ -z "$package_tarball" ]]; then
  echo "Unable to locate the packed mat-tel-input artifact." >&2
  exit 1
fi

cd "$smoke_dir"
npx --yes --package=@angular/cli@22.1.6 -- ng new consumer \
  --defaults \
  --routing=false \
  --skip-git \
  --skip-install \
  --style=css

cd consumer
npm install \
  "$package_tarball" \
  @angular/cdk@22.1.4 \
  @angular/material@22.1.4

node --input-type=module - "$PWD/src/app/app.ts" <<'NODE'
import { writeFileSync } from 'node:fs';

const appPath = process.argv[2];
writeFileSync(
  appPath,
  `import { Component } from '@angular/core';
import { MatTelInput } from 'mat-tel-input';

@Component({
  selector: 'app-root',
  imports: [MatTelInput],
  template: '<mat-tel-input />',
})
export class App {}
`,
);
NODE

npx ng build
