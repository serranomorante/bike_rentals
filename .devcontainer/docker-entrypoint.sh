#!/usr/bin/env bash

set -o errexit
set -o pipefail
set -o nounset

# Install node dependencies
cd ./frontend && yarn install

exec "$@"
