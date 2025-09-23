const express = require('express');
const mailSender = require("./config/emailconfig");
const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const serverConfig = require('./config/server-config');
const amqplib = require('amqplib');
const {EmailService} = require('./services');
const { json } = require('sequelize');
const app = express();

// THis Function is For Consuming The Message From The Queue
async function consumeMessage() 
{
    try 
    {
        const connection = await amqplib.connect("amqp://localhost");
        const channel = await connection.createChannel();
        const Queue = "noti-queue"
        await channel.assertQueue(Queue);
        channel.consume(Queue ,async (message) => {
        const Object = JSON.parse(`${Buffer.from(message.content).toString()}`);
        console.log(Object);
        
        EmailService.sendEmail("ssumanbaral55@gmail.com" , Object.receipentEmail , Object.subject , Object.text);
        channel.ack(message);
            
        })

    } 
    catch (error) 
    {
        console.log(error);
        
    }
    
}
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
    await consumeMessage();


});
