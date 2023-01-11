const express = require("express");
const app = express();
const shortUrl = require("./routes/url");
const homeRoutes = require("./routes/home");

//middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.use("/urlapi", shortUrl);
app.use("/", homeRoutes);

const PORT = 1337;

app.listen(PORT, () => {
    console.log("App is running at port", PORT);
})