FROM postgres:14-alpine

ENV POSTGRES_PASSWORD='root'
ENV POSTGRES_DB='library'

COPY init.sql /docker-entrypoint-initdb.d/

# docker build -t library-db-postgres-image:latest .
# docker run -d -p 5432:5432 --name library-db-postres library-db-postgres-image:latest


