import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Tarvitaan array johon tallennetaan postaukset ja jotka
// näytetään clientin puolella
var postListing = [];

// Render home page
app.get("/", (req, res) => {
      res.render("index.ejs");
});

// Nämä tapahtuu sitten kun saadaan postin tiedot käyttäjältä, kun tämä
// kirjoittaa uuden postauksen
app.post("/submit", (req, res) => {
    // Tallennetaan clientin postin muuttujaan post
    var post = req.body["newPost"];
    console.log(post);
    // Lisätään muuttuja listaan
    postListing.push(post);
    console.log(postListing);
    // Tämä muuttuja tulee lähettää takaisin clientille, jotta voidaan
    // näyttää postaus listauksessa
    res.render("index.ejs", {posts: postListing});
});


// POSTAUKSEN POISTAMINEN


// POSTAUKSEN MUOKKAAMINEN


// YKSITTÄISEN POSTAUKSEN NÄYTTÄMINEN ERILLISESSÄ VÄLILEHDESSÄ
app.get("/post", (req, res) => {
    res.render("post.ejs");
  });