#!/usr/bin/bash
# wip, does not work
address=$(grep POCKETHOST_ADDRESS .env | cut -d '=' -f2)
email=$(grep ADMIN_EMAIL .env | cut -d '=' -f2)
password=$(grep ADMIN_PASSWORD .env | cut -d '=' -f2)

echo "address: $address"
echo "email: $email"
echo "password: $password"

npx pocketbase-typegen --url $address --email email --password $password --out pocketbase-types.ts