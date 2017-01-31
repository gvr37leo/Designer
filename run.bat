@echo off
REM start watchify client/main.ts --debug -p tsify -o client/bundle.js
cd client
start tsc
cd ..

cd server/out
start nodemon server.js
cd ..
cd ..

cd server
start tsc
cd ..
start mongod