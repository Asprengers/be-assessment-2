/* eslint-disable semi */
var express = require('express')
var session = require('express-session')
var find = require('array-find')
var slug = require('slug')
var bodyParser = require('body-parser')
var multer = require('multer')
var mysql = require('mysql')
var argon2 = require('argon2')

require('dotenv').config()
var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
connection.connect()

var upload = multer({
    dest: 'static/upload/'
})

var uploadprofile = multer({
  dest:'static/profielfoto/'
})

express()
    .use(express.static('static'))
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET
    }))
    .set('view engine', 'ejs')
    .set('views', 'view')
    .get('/afterhome', afterhome)
    .get('/', home)
    .get('/chat/', chat)
    .get('/search', search)
    .get('/newmatch', newmatch)
    .get('/profile', profile)
    .get('/editmatch', editmatch)
    .post('/', upload.single('cover'), add)
    .post('/chat/', newmes)
    .get('/add', form)
    .get('/newmes/', message)
    .get('/:id', match)
    .get('/chat/:id', bericht)
    .post('/edit', edit)
    .get('/sign-up', signupForm)
    .get('/log-in', loginForm)
    .post('/log-in', login)
    .get('/log-out', logout)
    .post('/sign-up', signup)
    .post('/profile', uploadprofile.single('profielfoto'), signup)
    .delete('/:id', remove)
    .delete('/chat/:id', remover)
    .use(notFound)
    .listen(3000)
//matches
function home(req, res, next) {
    connection.query('SELECT * FROM overzicht', done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('home.ejs', {
                data: data,
                user: req.session.user
            })
        }

    }

}
function match(req, res, next) {
    var id = req.params.id
    connection.query('SELECT * FROM overzicht WHERE id = ?', id, done)


    function done(err, data) {
        if (err) {
            next(err)
        } else if (data.length === 0) {
            next()
        } else {
            res.render('match.ejs', {
                data: data[0],
                user: req.session.user
            })
        }
    }
}
function form(req, res) {
    if (req.session.user) {
        res.render('add.ejs')
    } else {
        res.status(401).send('Credentials required')
    }

}
function add (req, res, next) {
    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    }
    connection.query('INSERT INTO overzicht SET ?', {
        name: req.body.name,
        cover: req.file ? req.file.filename : null,
        bio: req.body.bio,
        book: req.body.book
    }, done)

    function done(err, data) {
        if (err) {

            next(err)
        } else {
            res.redirect('/' + data.insertId)
        }
    }
}
function remove(req, res, next) {
    var id = req.params.id

    connection.query('DELETE FROM overzicht WHERE id = ?', id, done)

    function done(err) {
        if (err) {
            next(err)
        } else {
            res.json({
                status: 'ok'
            })
        }
    }
}
function editmatch(req, res, next) {
  var id = req.params.id
  connection.query('SELECT * FROM overzicht',done)
     function done(err, data) {
        if (err) {
            next(err)
        } else if (data.length === 0) {
            next()
        } else {
            res.render('editmatch.ejs', {
                data: data[0],
                user: req.session.user
            })
        }
      }
    }
function edit(req, res, next){
      var id = req.params.id

       connection.query("UPDATE overzicht SET name = ?, cover = ?, bio = ?, book = ? WHERE id = ?", [req.body.name,req.file ? req.file.filename : null,req.body.bio, req.body.book, id
       ], done)
       function done(err, data) {
           if (err) {
               next(err)
           } else if (data.length === 0) {
               next()
           } else {
               res.render('home.ejs', {
                   data: data[0],
                   user: req.session.user
               })
           }
       }
    }

//chat
function chat(req, res, next) {
    connection.query('SELECT * FROM chat', done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('chat.ejs', {
                data: data,
                user: req.session.user
            })
        }

    }

}
function bericht(req, res, next) {
    var id = req.params.id
    connection.query('SELECT * FROM chat WHERE id = ?', id, done)

    function done(err, data) {
        if (err) {
            next(err)
        } else if (data.length === 0) {
            next()
        } else {
            res.render('bericht.ejs', {
                data: data[0],
                user: req.session.user
            })
        }
    }
}
function message(req, res) {
    if (req.session.user) {
        res.render('newmes.ejs')
    } else {
        res.status(401).send('Credentials required')
    }
}
function newmes(req, res) {
    if (!req.session.user) {
        res.status(401).send('Credentials required')
        return
    }
    connection.query('INSERT INTO chat SET ?', {
        Subject: req.body.Subject,
        message: req.body.message
    }, done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.redirect('/chat/' + data.insertId)
        }
    }
}
function remover(req, res, next) {
    var id = req.params.id

    connection.query('DELETE FROM chat WHERE id = ?', id, done)

    function done(err) {
        if (err) {
            next(err)
        } else {
            res.json({
                status: 'ok'
            })
        }
    }
}
function afterhome(req, res, next) {
    connection.query('SELECT * FROM overzicht', done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('afterhome.ejs', {
                data: data,
                user: req.session.user
            })
        }

    }

}
function notFound(req, res) {

    res.status(404).render('not-found.ejs')
}

//registratie
function signupForm(req, res) {
    res.render('sign-up.ejs')
}
function signup(req, res, next) {
    var gebruikersnaam = req.body.gebruikersnaam
    var wachtwoord = req.body.wachtwoord

    var min = 2
    var max = 160
    if (!gebruikersnaam || !wachtwoord) {
        res
            .status(400)
            .send('Username or password are missing')
        return

    }
    if (wachtwoord.length < min || wachtwoord.length > max) {
        res
            .status(400)
            .send(
                'Password must be between ' + min +
                ' and ' + max + ' characters'
            )
        return
    }

    connection.query(
        'SELECT * FROM profiel WHERE gebruikersnaam = ?',
        gebruikersnaam,
        done
    )

    function done(err, data) {
        if (err) {
            next(err)
        } else if (data.length !== 0) {
            res.status(409).send('Username already in use')
        } else {
            argon2.hash(wachtwoord).then(onhash, next)
        }
    }

    function onhash(hash) {
        connection.query('INSERT INTO profiel SET ?', {
            gebruikersnaam: gebruikersnaam,
            hash: hash,
            voornaam: req.body.voornaam,
            achternaam: req.body.achternaam,
            email: req.body.email,
            leeftijd: req.body.leeftijd,
            minLeeftijd: req.body.minLeeftijd,
            maxLeeftijd: req.body.maxLeeftijd,
            geslacht: req.body.geslacht,
            voorkeur: req.body.voorkeur,
            profielfoto: req.file ? req.file.filename : null,
            boek: req.body.boek,
            schrijfer: req.body.schrijfer,
            quote: req.body.quote
        }, oninsert)

        function oninsert(err) {
            if (err) {
                next(err)
            } else {
                // Signed up!
                req.session.user = {
                    gebruikersnaam: gebruikersnaam
                }
                res.redirect('/profile' + data.insertId)
            }


        }
    }
}
function loginForm(req, res) {
    res.render('log-in.ejs')
}
function login(req, res, next) {
    var gebruikersnaam = req.body.gebruikersnaam
    var wachtwoord = req.body.wachtwoord

    if (!gebruikersnaam || !wachtwoord) {
        return res.status(400).send('Username or password are missing')
    }

    connection.query('SELECT * FROM profiel WHERE gebruikersnaam = ?', gebruikersnaam, done)

    function done(err, data) {
        var user = data && data[0]

        if (err) {
            next(err)
        } else if (user) {
            argon2.verify(user.hash, wachtwoord).then(onverify, next)
        } else {
            res.status(401).send('Username does not exist')
        }

        function onverify(match) {
            if (match) {
                req.session.user = {
                    gebruikersnaam: user.gebruikersnaam
                };
                res.redirect('/profile/')
            } else {
                res.status(401).send('Password incorrect')
            }
        }
    }
}
function logout(req, res, next) {
    req.session.destroy(function (err) {
        if (err) {
            next(err)
        } else {
            res.redirect('/afterhome')
        }
    })
}

//overig
function profile(req, res, next) {
  // var id = req.params.id
  connection.query('SELECT * FROM profiel', done)


  function done(err, data) {
      if (err) {
          next(err)
      } else if (data.length === 0) {
          next()
      } else {
          res.render('profile.ejs', {
              data: data,
              user: req.session.user
          })
      }
  }


}




function search(req, res, next) {
    connection.query('SELECT * FROM overzicht', done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('search.ejs', {
                data: data,
                user: req.session.user
            })
        }

    }

}
function newmatch(req, res, next) {
    connection.query('SELECT * FROM overzicht', done)

    function done(err, data) {
        if (err) {
            next(err)
        } else {
            res.render('newmatch.ejs', {
                data: data,
                user: req.session.user
            })
        }

    }

}



// function edit (req, res){
//   var id = req.params.id
//    var body = req.body
//
//   //function to let a user update their profile
//     connection.query('UPDATE overzicht SET name = ?, cover = ?, bio = ?, book = ? WHERE id = ?', [body.name, req.file ? req.file.filename : null, body.bio, body.book, id], done)

// if (!req.session.user) {
//        res.status(401).send('Credentials required')
//        return
//    }
