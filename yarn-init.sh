yarn install
npx ts-node $(npm bin)/typeorm migration:generate -n Initialize
npx ts-node $(npm bin)/typeorm migration:run

yarn run seed:run --seed CreateUsers
yarn run seed:run --seed CreateCategories
yarn run seed:run --seed CreateTasks
yarn run seed:run --seed CreateTaskHistories