//Webbtjänst med MongoDB och express

//Importera nödvändiga moduler
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Databasanslutning
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Ansluten till MongoDB"))
.catch(err => console.error("Kunde inte ansluta till MongoDB", err));

//Modell
const workExperienceSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Du måste fylla i företagsnamn."]
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste fylla i jobbtitel."]
    },
    location: {
        type: String,
        required: [true, "Du måste fylla i plats."]
    },
    startdate: {
        type: Date,
        required: [true, "Du måste fylla i startdatum."]
    },
    enddate: {
        type: Date,
        required: [true, "Du måste fylla i slutdatum."]
    },
    description: {
        type: String,
        required: [true, "Du måste fylla i beskrivningen."]
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

const workExperience = mongoose.model('WorkExperience', workExperienceSchema);

//Routes
app.get("/api", async (req, res) => {
    res.json({message: "Welcome to this API"});
});

app.get("/workexp", async(req, res) => {
    try {
        let result = await workExperience.find({});

        return res.json(result);
    } catch(error) {
        return res.status(500).json(error);
    }
});

app.post("/workexp", async(req, res) => {
    try {
        let result = await workExperience.create(req.body);

        res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});