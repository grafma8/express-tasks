#!/bin/sh
yarn install && \
yarn migration:generate -n Initialize --connection=default && \
yarn migration:run --connection=default && \
yarn seed:run --seed CreateUsers --connection=default && \
yarn seed:run --seed CreateCategories --connection=default && \
yarn seed:run --seed CreateTasks --connection=default && \
yarn seed:run --seed CreateTaskHistories --connection=default