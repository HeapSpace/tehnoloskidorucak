#!/usr/bin/env bash

include () {
    [[ -f "$1" ]] && source "$1"
}

include ".env"

node index.js

hugo "$@"