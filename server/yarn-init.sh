#!/bin/sh
yarn install && \
npx ts-node $(npm bin)/typeorm migration:generate -n Initialize --connection=default && \
npx ts-node $(npm bin)/typeorm migration:run -c default && \
yarn run seed:run --seed CreateUsers --connection=default && \
yarn run seed:run --seed CreateCategories --connection=default && \
yarn run seed:run --seed CreateTasks --connection=default && \
yarn run seed:run --seed CreateTaskHistories --connection=default