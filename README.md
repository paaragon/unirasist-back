# Student Assistant Backend

## Docker

- **Build**: `docker build -t tfg/assistant-backend .`
- **Run**: `docker run --name assistant-backend -d -p 3001:3001 tfg/assistant-backend`

## Local DB

pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop

createdb mydatabasename
dropdb mydatabasename
    
psql mydatabasename