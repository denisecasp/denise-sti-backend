const PORT = process.env.PORT || 3000

const cors = require("cors")
const express = require("express")
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const rug = require('random-username-generator');

const app = express()
const PORT = process.env.PORT || 3001

let users = {};
app.use(function (req, res, next) {
   //res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'");
   next();
});

app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.json());

app.get("/", (request ,response)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body={"status": "available"}
   response.status(200).send(body)
})

app.get("/registerscore", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   let user = req.query.user
   let score = req.query.score
   users[user] = score
   res.status(200).send({"status":"success"})
})

app.get("/post", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   let user = req.body.user;
   let score = req.body.score;
   users[user] = score
   res.status(200).send({"status":"success"})
})

app.get("/highscores", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   res.status(200).send(users)
})

app.post('/echo', (req, res) => {
   console.log(JSON.stringify(req.body))
   res.status(200).send(req.body)
});

app.get('/auth', (req, res) => {
   let user = rug.generate();
   users[user] = 0
   res.status(200).send({"user":user})
});

app.post('/auth', (req, res) => {
   let user = req.body.user;
   let password = req.body.password;
   console.log(req.body)
   console.log(`User ${user}`)
   console.log(`Password ${password}`)
   if(true){
      console.log("Authorized")
      const token = jwt.sign({
            data: 'foobar'
      }, 'your-secret-key-here', { expiresIn: 60 * 60 }); 
      console.log(token)
      res.status(200).send(token)
  }else{
      console.log("Not authorized")
      res.status(200).send({"STATUS":"FAILURE"})
   }
});

app.get("/football", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body=
   [
      {
            "name": "DIF",
            "points": 9,
            "logo":"https://allsvenskan.se/lagen/djurgardens-if/_/image/939ceff1-1923-48b0-af9a-997dfe4fba51:126ef93a454f04822c9f8575831a0871abd06398/width-110/Djurgården.svg"
      }
   ]

   res.set('Content-Type', 'application/json');
   res.status(200).send(body)
})

app.listen(PORT , ()=>{
     console.log(`STARTED LISTENING ON PORT ${PORT}`)
});