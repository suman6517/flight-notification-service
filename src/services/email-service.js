const TIcketRepository = require("../repositories/ticket-repo");
const { Mailer } = require("../config");

const ticketRepo = new TIcketRepository();

async function sendEmail(mailFrom , mailTo, subject , text)
{
    try 
    {
        const response = await Mailer.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:subject,
            text:text
        });
        return response;
    } 
    catch (error) 
    {
        console.log(error);
        throw error;
    }
};

async function CreateTicket(data)
{
    try 
    {
        const response = await ticketRepo.create(data);
        return response;
    } 
    catch (error) 
    {
        console.log(error);
        throw error;
    }
}

async function getPendingEmail(params) 
{
    try 
    {
        const response = await ticketRepo.getPendingTickets();
        return response;
    } 
    catch (error) 
    {
        console.log(error);
        throw error;
    }
    
}

module.exports = {
    sendEmail,
    getPendingEmail,
    CreateTicket
}