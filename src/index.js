const express = require('express');
const mailSender = require("./config/emailconfig");
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const serverConfig = require('./config/server-config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async() => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    // try 
    // {
    //     const response = await mailSender.sendMail({
    //     from:serverConfig.GMAIL,
    //     to: "ssumsnbsrsl@gmail.com",
    //     subject: "Is the Service Working ?",
    //     text: "Yes It's Working "
    // });
    // console.log(response);
        
    // } 
    // catch (error) 
    // {
    //     console.log(error.message);
        
    // }
});
