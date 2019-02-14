[![Build Status](https://travis-ci.org/HeapSpace/tehnoloskidorucak.svg?branch=master)](https://travis-ci.org/HeapSpace/tehnoloskidorucak)

# Tehnoloski Doručak

[tehnoloskidorucak.io](https://tehnoloskidorucak.io)

## Build

Put the following in `./.env` file:

```bash
readonly AIRTABLE_TOKEN=<your_token>
```

## Netlify configuration

### Deploy settings

+ `Build command` : `./hugo.sh`

### Build environment variables

+ `AIRTABLE_TOKEN`
+ `WEBHOOK_ID`
+ `DEPLOY_PASSWORD`
