var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');


const PORT = 8000; // PORT DU SERVER NODE

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api', (req, res) => {

  res.json({
    message: "ROUTES PRINCIPALE"
  })

});



//On créé un groupe que l’on nomme Testons les opérations
// Authentification de l'utilisateur  => création du token 
app.post('/api/login', (req, res) => {

  // variable POSTER
  var obj = req.body;
  var name = obj.name

  // MOCK  => utilisateur =  coco
  if (name == "coco") {

    const privateKey = "abcd"; // Clé privée

    var err = {};

    // Fonction par defaut de JWT (authentification)
    //==============================================
    jwt.sign({ name: 'coco' }, privateKey, function (err, token)
     {

      err = {
        name: 'TokenExpiredError',
        message: JSON.stringify(token),
        expiredAt: 1408621000 // cookies
      }


      res.send(err);
      res.end();
    });

  } else {
    res.sendStatus(403);
    res.end();
  }

});


  // url de verification de l'utilisateur
app.post('/api/getPersonne', (req, res) => {
  //mock 
  var dmd = req.body.dmd;
  var token = req.body.token;

  // Fonction verifier si le token utilise est identique avec l'utilisateur
  // Fonction verifier de jwt 
  
  jwt.verify(token, 'abcd', function (err, decoded) {
    //console.log(decoded + "//" + this.tokenSave) // bar
    if (err) {
      res.status(403);
      res.end();
    } else {
      res.status(200);
      res.json({
        dmd,
        decoded
      });
      res.end();
    }

  });

});

// PORT DU SERVEUR 
app.listen(PORT); 
