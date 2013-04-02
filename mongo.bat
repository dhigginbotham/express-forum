@echo off

set MONGODB=D:\Mongo\bin\mongod.exe
set DB_PATH=D:\Mongo\data\db

echo Starting MongoDB ...
start %MONGODB% --dbpath %DB_PATH% --verbose

echo Success!