# Book a date

## 1. Before installing

* install [NodeJS](https://nodejs.org/en/download/)
* install [mysql](https://dev.mysql.com/)
* $ brew install mysql
* $ npm init -y
* $ npm install mysql dotenv
* $ npm install express
* $ npm install array-find
* $ npm install ejs
* $ npm install slug body-parser
* $ npm install multer
* $ npm install argon2
* $ npm install express-session

## 2. Install

``` bash
git clone https://github.com/Asprengers/be-assessment-2.git
cd be-assessment-2

```
## 3. Database setup

``` bash
Brew install mysql
Brew services start mysql
Mysql -u root -p (enter your password)
CREATE DATABASE IF NOT EXISTS matches;
USE matches;
CREATE TABLE IF NOT EXISTS overzicht (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT CHARACTER SET utf8,
  cover TEXT CHARACTER SET utf8,
  bio TEXT CHARACTER SET utf8,
book TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username TEXT CHARACTER SET utf8,
  hash TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);
touch .env
echo "DB_HOST=localhost
DB_USER=root
DB_NAME=mymoviewebsite
DB_PASSWORD=mypassword
SESSION_SECRET=ilikecats" >> .env
```

## 4. Start
```bash
npm install
npm start
```
[MIT License](https://github.com/Asprengers/be-assessment-2/blob/master/licence.md)  © 2018 [Amy Sprengers](https://github.com/Asprengers)
