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
1. Brew install mysql
2. Brew services start mysql
3. Mysql -u root -p (enter your password)
4. CREATE DATABASE IF NOT EXISTS matches;
5. USE matches;
6. CREATE TABLE IF NOT EXISTS overzicht (
  id INT NOT NULL AUTO_INCREMENT,
  name TEXT CHARACTER SET utf8,
  cover TEXT CHARACTER SET utf8,
  bio TEXT CHARACTER SET utf8,
  book TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);
7. CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username TEXT CHARACTER SET utf8,
  hash TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);
8. CREATE TABLE IF NOT EXISTS chat (
  id INT NOT NULL AUTO_INCREMENT,
  Subject TEXT CHARACTER SET utf8,
  message TEXT CHARACTER SET utf8,
  PRIMARY KEY (id)
);
9. touch .env
10. echo "DB_HOST=yourhost
DB_USER=youruser
DB_NAME=namedatabase
DB_PASSWORD=mypassword
SESSION_SECRET=yoursecret" >> .env
```

## 4. Start
```bash
npm install
npm start
```

## 5. To list
```bash
[x] git npm database node are used
[x] user can sign up
[x] user can log in
[x] user can log out
[x] user can stay logged in through sessions
[x] files can be uploaded
[] add structure
[] code style is consistent
[] document the code
[] update css
[] edit function CRUD
[] match function (filteren. Een minimale filter is een filter op geslacht en voorkeur van het profiel. (ander.geslacht==mijn.voorkeurmv && ander.voorkeurmv==mijn.geslacht))
[] add register to profile
[] chat function
[] search function
[] profielen weergeven
[] relaties weergeven
```

[MIT License](https://github.com/Asprengers/be-assessment-2/blob/master/licence.md)  © 2018 [Amy Sprengers](https://github.com/Asprengers)
