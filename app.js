const cors = require("cors")
const express = require("express")

const app = express()
const PORT = process.env.PORT || 3001

app.use('/healthcheck', require('./routes/healthcheck.routes'));
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body={"status": "available"}
   res.status(200).send(body)
})

app.get("/football", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body=
   [
      {
            "name": "AIK",
            "points": 9,
            "logo":"https://www.allsvenskan.se/lagen/aik/_/image/0c02711d-d44e-4124-a555-0df3d8264551:0fb201f22e823629dada3ee33327a5b70963120b/width-110/AIK.svg"
      },
      {
            "name": "DIF",
            "points": 6,
            "logo":"https://www.allsvenskan.se/lagen/aik/_/image/939ceff1-1923-48b0-af9a-997dfe4fba51:126ef93a454f04822c9f8575831a0871abd06398/width-110/Djurg%C3%A5rden.svg"
      },
      {
            "name": "BK Häcken",
            "points": 5,
            "logo":"https://www.allsvenskan.se/lagen/bk-hacken/_/image/29528574-2d7b-43e2-9b91-89f3bfa74bdc:f981f4253c7e9711fe2c9449765cda15327af8aa/width-110/BK_H%C3%A4cken_logo.svg"
      },
      {
            "name": "Degerfors IF",
            "points": 3,
            "logo":"https://www.allsvenskan.se/lagen/bk-hacken/_/image/e58c3846-9f1a-4bde-9ccb-99df65cc5360:c14b6bb4bc1d5954b698254ffed2e5a4593a1b6b/width-110/Degerfors%20IF.svg"
      }
   ]
   
   res.set('Content-Type', 'application/json');
   res.status(200).send(body)
})

app.listen(PORT , ()=>{
     console.log(`STARTED LISTENING ON PORT ${PORT}`)
});