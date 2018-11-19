#!/usr/bin/env bash

readonly tdfns="https://tehnoloskidorucak.io/.netlify/functions"

curl "$tdfns/fetchMeetups" -o data/Meetups.json

hugo "$@"