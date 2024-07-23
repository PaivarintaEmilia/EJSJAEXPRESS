import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Add CSS
app.use(express.static("public"));

// Tarvitaan array johon tallennetaan postaukset ja jotka
// näytetään clientin puolella
var postListing = [];

// Render home page
app.get("/", (req, res) => {
      res.render("index.ejs", {posts: postListing, editIndex: null});
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
app.post('/delete', (req, res) => {
    console.log(`Ekan kerran array ${postListing}`);
    //const index = parseInt(req.body.index); // Convert index to integer
    // Remove the row from yourDataArray (example)
    //yourDataArray.splice(index, 1);
    const index =  req.body["delete"]; // Saadaan poistettavan postauksen index
    //const i =  req.body.i; // undefined
    console.log(index);
    
    if (index > -1) {
        postListing.splice(index, 1);
    }
    
    console.log(postListing); // ['apple', 'banana', 'date']
    //res.redirect('/'); // Redirect to the main page lista tyhjänä
    res.render("index.ejs", {posts: postListing});
});

// POSTAUKSEN MUOKKAAMINEN

// Kun painetaan edit painiketta, ja halutaan muokkauskenttä näkyviin
app.post('/edit', (req, res) => {
    const index =  req.body["edit"]; // Saadaan muokattavat postauksen index
    res.render("index.ejs", {posts: postListing, editIndex: index});
});

// Kun painetaan /update painiketta, ja halutaan tallentaa muokkaus lataamalla uusi lista
app.post('/update', (req, res) => {
    const index =  req.body["index"]; // Saadaan muokattavat postauksen index
    const updatedPost =  req.body["updatedPost"]; // Saadaan uusi syötetty teksti

    if (index >= 0 && index < postListing.length) {
        postListing[index] = updatedPost;
    }

    res.render("index.ejs", {posts: postListing, editIndex: null});
});

