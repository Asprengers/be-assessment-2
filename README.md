# Book a date

## 1. Before installing

install [NodeJS](https://nodejs.org/en/download/)
and install [MongoDB](https://docs.mongodb.com/manual/installation/)

## 2. Install

``` bash
git clone https://github.com/Asprengers/be-assessment-2.git
cd be-assessment-2
```
## 3. database setup

``` bash
1. mkdir db
2. mongod --dbpath db
3. mongo
4. use bookadate
5. db.runCommand({ create: "users" })
6. touch .env
7. echo "DB_HOST=localhost
DB_PORT=27017
DB_NAME=bookadate
DB_USER=root
SESSION_SECRET=books" >> .env
```

## 4. start
```bash
npm install
npm start
```
[MIT License](https://github.com/Asprengers/be-assessment-2/blob/master/licence.md)  © 2018 [Amy Sprengers](https://github.com/Asprengers)
