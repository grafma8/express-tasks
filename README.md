# Express-tasks

### Initializing dev-db
- yarn install
- cd docker/
- docker-compose up -d
- cd ..
- copy orm-config.json, .env
- (npx ts-node (npm bin)/typeorm migration:generate -n Initialize)
- npx ts-node (npm bin)/typeorm migration:run
- yarn run seed:run -s CreateUsers
- yarn run seed:run -s CreateCategories
- yarn run seed:run -s CreateTasks
- yarn run seed:run -s CreateTaskHistories