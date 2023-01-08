const express = require("express");
// This creates a server
const routes = require("./routes/authRoutes");
const app = express();

//To accept something we have middlewares
// middlewares are functions that get called before function written in ap is called

// Accept json
app.use(express.json());

//Accept the body
app.use(express.urlencoded({extended: true}));

//show the html
app.use(express.static('public'));

const PORT = 1337;

app.use("/api/v1", routes);

app.listen(PORT, () => {
    console.log("App is running at PORT=", PORT);
});
