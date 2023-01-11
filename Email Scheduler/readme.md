# Email Scheduler

## Overview
This project is used to send automated emails at specified iterval. It makes use of the following packages:
    1. `express` - To create a server.
    2. `node-cron` - To perform a task at a specified time
    3. `nodemailer` - To send email. We are using Gmail SMTP service.

## How to run the project:
   + Clone the repository
   + Create **config** folder. Inside this folder create **credentials.js** file to store your email and password. The code should look like this:
        ``` 
        let credentials = {
            USER_EMAIL: <Your_EMAIL>
            USER_PASSWORD: <App Password>
        }
        module.exports = credentials;
        ```
    + To install all the packages, run the command:`npm install`

### How to setup Gmail SMTP service:
  1. Goto your gmail account.
  2. In the security tab enable 2-step Verification(if not already on).
  3. Create App password with any name you want. A new password will be generated. Copy the password and paste it inside the */config/credentials.js* file as **USER_PASSWORD**

## Helpful Links:
+ [Create a server in Express](https://expressjs.com/en/starter/hello-world.html)
+ [Nodemailer SMPTP Transport](https://nodemailer.com/smtp/)
+ [node-cron schedule](https://www.npmjs.com/package/node-cron)
+ [Cron Schedule expressions - crontab guru](https://crontab.guru/)