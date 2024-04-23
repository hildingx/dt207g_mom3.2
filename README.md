# REST-Webbtjänst
***Av Alexander Hilding***

## Arbetsgång
 * Skapat MongoDB-databas dt207g_mom3 via MongoDB Atlas.
 * Anslutit till databasen med MongoDB Compass för bättre översikt av databas.
 * Initierat npm-projekt.
 * Installerat paket -
	* express, webbappram för att skapa server som kan ta emot och hantera http-förfrågningar
	* mongoose, paket för anslutning till MongoDB-databas.
	* dotenv --save-dev, paket för att hantera miljövariabler
	* cors, paket som tillhandlahåller en connect/express middleware för att aktivera CORS
	* nodemon, verktyg för att automatiskt starta om applikationen vid upptäckt av filändring
* Använt Thunder Client som plug-in i VSCode för att testa API-anrop.
* Satt upp ett git-repo och initierat server.js med grundläggande server-setup och API-rutter.
* Skapat ett Mongoose-schema och modell för arbetsuppgifter.
* Testat API med Thunder Client.
* Implementerat CRUD-operationer för API-rutter:
	* GET - Hämtar alla eller en specifik arbetsupplevelse.
	* POST - Lägger till en ny arbetsupplevelse.
	* PUT - Uppdaterar en befintlig arbetsupplevelse.
	* DELETE - Tar bort en arbetsupplevelse.
* Publicerat webbtjänsten på Render.

## Länk
API'et finns tillgänglig på https://dt207g-mom3-2.onrender.com/workexp/

## Användning
Såhär når du API'et.
| Metod |Ändpunkt  |Beskrivning  |
|--|--|--|
| GET | workexp/ | Hämtar alla tillgängliga arbetserfarenheter |
| GET | workexp/{id} | Hämtar specifik arbetserfarenhet med angivet ID |
| POST | workexp/ | Lagrar ny arbetserfarenhet |
| PUT | workexp/{id} | Uppdaterar existerande arbetserfarenhet med angivet ID  |
| DELETE | workexp/{id} | Tar bort arbetserfarenhet med angiet ID |

Strukturen på ett arbetserfarenhet-objekt ser ut som följer i JSON:

      
    {
	    "companyname": "1337 AB",
	    "jobtitle": "Leet-expert",
	    "location": "Stockholm",
	    "startdate": "2021-01-01",
	    "enddate": "2022-12-31",
	    "description": "Krigade med BBS'er morgon till kväll"
    }
