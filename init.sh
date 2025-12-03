

if [ -e "scripts/$1.ts" ]; then exit 1; fi
if [ -e "inputs/$1.txt" ]; then exit 1; fi

echo creating template for day $1

cp scripts/template.ts scripts/$1.ts
echo "" > inputs/$1.txt


echo 