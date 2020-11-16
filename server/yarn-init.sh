#!/bin/sh
# yarn install && \
# yarn migrate:generate -n Initialize --connection=default && \
yarn migrate:run --connection=default && \
yarn seed:run --seed CreateUsers --connection=default && \
yarn seed:run --seed CreateCategories --connection=default && \
yarn seed:run --seed CreateTasks --connection=default && \
yarn seed:run --seed CreateTaskHistories --connection=default