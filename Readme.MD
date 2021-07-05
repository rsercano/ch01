## Requirements
- Node v14+
- Postgres 10+
    - Create schema `qooper` in `postgres` database.
    - `postgres` database should have user `postgres` with password `postgres`

## Execute
Server will start at 3000 port as soon as `npm start` command is executed. 
Initially it'll create required tables and relations. Due to lack of time, I couldn't prepare swagger docs, yet you can find a postman collection JSON file in the root directory. 

## What is Missing
- [ ] Extract database parameters into environment file
- [ ] Swagger documentation (how to do automatic generation with abstraction?)
- [ ] %100 test coverage with jest
- [ ] CI files and configuration (travis etc.)
  - [ ] With build (CI) & deploy (CD)
- [ ] Service function documentation with JsDocs
- [ ] Dockerize the app
  - [ ] `docker-compose.yaml` for postgres and dependencies
- [ ] Prepare heroku yaml to deploy
  - [ ] deploy npm script


