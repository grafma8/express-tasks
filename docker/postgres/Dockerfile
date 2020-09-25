FROM postgres:13

# https://hub.docker.com/_/postgres

ENV POSTGRES_USER=dev_user
ENV POSTGRES_PASSWORD=gtasksecret
ENV POSTGRES_DB=development_db
ENV POSTGRES_INITDB_ARGS='--encoding=utf-8 --locale=C'
# ENV POSTGRES_INITDB_WALDIR
ENV PGDATA=/var/lib/postgresql/data

# for JP
# RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
# ENV LANG ja_JP.UTF-8
