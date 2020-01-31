// server.js
// example server with database

// create connection to database
const mysql = require('mysql');
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'quiz'
});

// connect to database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

// create server
const express = require('express');
let app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-reqested-With, Content-Type, Accept");
	next();
});


/*@function /createUser retrieve name from client
 * query that user to ensure no double
 *register also return userdata row
 *@param {req, res} takes in a request and sends a result
 */
app.post('/createUser', (req, res) =>{
  var name = req.body.name;
  console.log(name);
  db.query('SELECT * FROM userdata WHERE username = "'+name+'"', function(err, rows){
    if(err) {
      db.end();
      return console.log(err);
    }else{
      if(!rows.length){
        db.query('INSERT INTO userdata SET username = "'+name+'", answer1 = 0, answer2 = 0, answer3 = 0, answer4 = 0, song =""', function (err, rows2){
          if(err){
            throw err;
          }
        });
      }

      db.query('SELECT * FROM userdata WHERE username = "'+name+'"', function(err, rows){
        if(err){
          throw err;
        }else{
          res.json(rows);
        }
      });
    }
  });
});


/*@function /getSong.:id retrieve name from client
 * get answers from table
 *@param {req, res} takes in a request and sends a result
 * {id} users unique id
 *
 * returns result ( answer1, answer2, answer3, answer4 FROM userdata )
 */
app.get('/getSong/:id', (req, res) => {
  var id = req.params.id;
  db.query('SELECT answer1, answer2, answer3, answer4 FROM userdata WHERE id='+id+'', function(err, result){
    if(err) throw err;
    res.send(result)
  })
});

/*@function /updateGame/:id/:genre retrieve name and answer choice from client
 * update answers in table. User can retake quiz to generate a new song
 *@param {req, res} takes in a request and sends a result
 * {id} users unique id used to query table
 * {genre} answer choice to update table
 *
 * returns result ( * FROM userdata )
 */
app.get('/updateGame/:id/:genre', (req, res) => {
var genre = req.params.genre;
var id = req.params.id;
if(genre === '0'){
db.query('UPDATE userdata set answer1=answer1+1 where id = '+id+'', function(err, res){
  if(err) throw err;
});
}
else if(genre === '1'){
  db.query('UPDATE userdata set answer2=answer2+1 where id = '+id+'', function(err, res){
    if(err) throw err;
  });
}
else if(genre === '2'){
  db.query('UPDATE userdata set answer3=answer3+1 where id = '+id+'', function(err, res){
    if(err) throw err;
  });
}
else if(genre === '3'){
  db.query('UPDATE userdata set answer4=answer4+1 where id = '+id+'', function(err, res){
    if(err) throw err;
  });
}
let sql = "SELECT * FROM userdata";
db.query(sql, (err, result) => {
  if(err) throw err;
  console.log(result);
  res.send(result);
})
});
//remove from database
/*@function /deleteUser/:id/ retrieve name and DELETE user from table
 * user will be removed from database
 *@param {req, res} takes in a request and sends a result
 * {id} users unique id used to query table
 *
 * returns result ( query result )
 */

app.delete('/deleteUser/:id',(req,res) => {
  var id = req.params.id;
  let sql = "DELETE FROM userdata WHERE id="+id+"";
  let query = db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(`deleted ${id}`);
      res.json(result);
  });
});


// listen to the Google App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
