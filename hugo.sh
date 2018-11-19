#!/usr/bin/env bash

include () {
    [[ -f "$1" ]] && source "$1"
}

include ".env"

readonly airtable="https://api.airtable.com/v0/appNUbQdF6KjbUOHy"

curl "$airtable/Meetups?api_key=$AIRTABLE_TOKEN" -o data/Meetups.json

hugo "$@"