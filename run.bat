@echo off
start watchify client/main.ts --debug -p tsify -o client/bundle.js

cd server/out
start nodemon server.js
cd ..
cd ..
start tsc