#!/bin/sh

connection=default
# yarn install && \
# yarn migrate:generate -n Initialize --connection=default && \
yarn migrate:run --connection=$connection && \
yarn seed:run --seed CreateUsers --connection=$connection && \
yarn seed:run --seed CreateCategories --connection=$connection && \
yarn seed:run --seed CreateTasks --connection=$connection && \
yarn seed:run --seed CreateTaskHistories --connection=$connection