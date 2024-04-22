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
.then(() => console.log("Ansluten till MongoDB Atlas"))
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
        let result = await workExperience.find({}).sort({startdate: -1});

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

app.put("/workexp/:id", async (req, res) => {
    try {
        const result = await workExperience.findByIdAndUpdate(
            req.params.id,
            req.body,
        );
        if (!result) {
            return res.status(404).json({ message: 'Ingen post hittades med det angivna ID:t' });
        }
        res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Serverfel vid uppdatering av post' });
    }
});

app.delete("/workexp/:id", async (req, res) => {
    try {
        const result = await workExperience.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Ingen post hittades med det angivna ID:t' });
        }
        res.json({ message: "Posten har raderats" });
    } catch (error) {
        return res.status(500).json({ message: 'Serverfel vid radering av post' });
    }
});

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});