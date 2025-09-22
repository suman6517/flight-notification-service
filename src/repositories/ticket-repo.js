const CrudRepo = require("./crud-repo");
const {Ticket} = require("../models");

class TIcketRepository extends CrudRepo{

    constructor()
    {
         super(Ticket);
        
    }
    async getPendingTickets()
    {
        const response = await Ticket.findAll({
            where:{
                status:"PENDING"
            }
        });
        return response;
    }
} 
module.exports = TIcketRepository;