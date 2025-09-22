// import Apperror from "../Utils/Errors/app-errors.js";
const { StatusCodes } = require("http-status-codes");

class CrudRepo{
    constructor(model)
    {
        this.model = model;
    }

    async create (data)
    {
       
            
            const response = await this.model.create(data);
            return response;
            
    }

   async destroy (data)
    {
        
           
            const response = await this.model.destroy(
                {
                    where:{
                        id:data
                    }
                }
            );

            if(!response)
            {
                throw new Error("Not Able To Find The Resource With The Given Id",StatusCodes.NOT_FOUND);
            }
            return response;
            
    }

    async getOne (data)
    {
            const response = await this.model.findByPk(data);
            if(!response)
            {
                throw new Error("Not Able To Find The Resource With The Given Id",StatusCodes.NOT_FOUND);
            }
            return response;
            
        
    }


    async getAll ()
    {
       
            const response = await this.model.findAll();
            return response;
        
    }

    async update (id,data) //(Data -> Object)
    {
        
            const [response] = await this.model.update(data , {
               where:{
                      id:id
                    }
        });
        if (response === 0) 
        {
             throw new Error("Not Able To Find The Resource With The Given Id",StatusCodes.NOT_FOUND);
        };
      
       
            return response;     
    }
}

module.exports = CrudRepo;