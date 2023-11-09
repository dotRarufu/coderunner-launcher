#!/usr/bin/bash
source .env

echo "runs"
echo $POCKETHOST_ADDRESS
echo $ADMIN_EMAIL
echo $ADMIN_PASSWORD

npx pocketbase-typegen --url $POCKETHOST_ADDRESS --email $ADMIN_EMAIL --password $ADMIN_PASSWORD --out src/types/pocketbase-types.ts