[![Build Status](https://travis-ci.org/HeapSpace/tehnoloskidorucak.svg?branch=master)](https://travis-ci.org/HeapSpace/tehnoloskidorucak)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3dacc1b9-ac05-4c09-b42e-71373f02ce46/deploy-status)](https://app.netlify.com/sites/td/deploys)

# Tehnoloski doručak

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
