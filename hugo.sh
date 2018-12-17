#!/usr/bin/env bash

set -e

include () {
    [[ -f "$1" ]] && source "$1"
}

include ".env"

node index.js

hugo "$@"