const cors  = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const db = require('./utils/db-connection')
const usersRoutes = require('./routes/usersRoutes')

const app  = express();

app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.use(express.json())


app.get('/', (req,res) => {
    res.send("Appointment Booking App")
})

app.use('/book-appointment', usersRoutes)


db.sync({forced:true}).then(() => {
    app.listen(3000, () => {
    console.log("Server is running on 3000")
})
}).catch((err) => {
    console.log(err)
});

