# Book a date

![](screenshot/slide.png)

## Over

> Book A Data is a dating web app that is based on, how to connect strangers with each other, by sharing the same interests for books. In this web app, people are be able to find each other and start a new chapter of their live.  

## 1. Before installing

``` bash
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
```

## 2. Install
* git clone https://github.com/Asprengers/be-assessment-2.git
* cd be-assessment-2

## 3. Database setup

1. Brew install mysql
2. Brew services start mysql
3. Mysql -u root -p (enter your password)
4. CREATE DATABASE IF NOT EXISTS matches;
5. USE matches;
6. Add in database matches:
```bash
CREATE TABLE overzicht (
  id int(11) NOT NULL AUTO_INCREMENT,
  cover text,
  name text,
  bio text,
  book text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

 CREATE TABLE profiel (
  id int(11) NOT NULL AUTO_INCREMENT,
  gebruikersnaam text,
  hash text,
  email text,
  voornaam text,
  achternaam text,
  leeftijd text,
  minLeeftijd text,
  maxLeeftijd text,
  geslacht text,
  voorkeur text,
  profielfoto text,
  boek text,
  schrijfer text,
  quote text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

 CREATE TABLE chat (
  id int(11) NOT NULL AUTO_INCREMENT,
  Subject text,
  message text,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
```
7. touch .env
8. echo >> .env:
```bash
"DB_HOST=yourhost
DB_USER=youruser
DB_NAME=namedatabase
DB_PASSWORD=mypassword
SESSION_SECRET=yoursecret"
```

![](screenshot/database.png)

## 4. Start

To start type into terminal:
* npm install
* npm start


## 5. To list

* [x] git npm database node are used
* [x] user can sign up
* [x] user can log in
* [x] user can log out
* [x] user can stay logged in through sessions
* [x] files can be uploaded
* [x] display profiles
* [x] chat function
* [x] add register to profile
* [ ] add structure
* [ ] code style is consistent
* [ ] document the code
* [ ] update css
* [ ] edit function CRUD
* [ ] match function (filteren.))
* [ ] search function
* [ ] display relations


## 6. What I have learned

> Before this course started I had no idea what I was doing but after a while I slowly started to understand how things worked.
I found the slides very helpful.

## Screenshots

<!-- ![](screenshot/home.png){:height="50%" width="50%"}
![](screenshot/feed.png =150 )
![](screenshot/match.png =150 )
![](screenshot/setup.png)    -->

| <img src="screenshot/home.png" width="200" height="300">   | <img src="screenshot/feed.png" width="200" height="300"> | <img src="screenshot/match.png" width="200" height="300"> | <img src="screenshot/bericht.png" width="200" height="300"> |



## Credits

[CMDA-BE course 17-18](https://github.com/cmda-be/course-17-18)

[MIT License](https://github.com/Asprengers/be-assessment-2/blob/master/licence.md)  © 2018 [Amy Sprengers](https://github.com/Asprengers)
