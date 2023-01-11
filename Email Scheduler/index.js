const express = require("express");
const app = express();
const scheduler = require("node-cron");
const {transporter, options} = require("./services/email");

const PORT = 1338;

scheduler.schedule("* * * * *", () => {
    console.log("Sending Email");
    transporter.sendMail(options, (err, info) => {
        if(err){
            console.error(err);
        }
        console.log("Email sent with info=", info);
    })
})


app.listen(PORT, () => {
    console.log("Server running at Port=", PORT)
});