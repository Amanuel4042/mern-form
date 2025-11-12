import {Form} from  "../models/formModel.js";

export const submitForm = async (req,res)=> {
    console.log("form rescieved", req.body);
    
    const {name,email,gender,interests,
        date,color,age,message}= req.body;
        if (!name || !email || !gender || !date || !color || !age
            || !message)
            {
                return res.status(404).json({error:"all fields are required"});
            
            }

            try {
                const newForm =new Form({
                    name,email,gender,interests,date,color,age,message
                }); 

                await newForm.save();
                res.status(200).json({message: "submitted successfully"});
            }
            catch(error){
                console.log(error.message);
                res.status(500).json({message: "error"});


            }
};

export const getForms = async (req,res)=>
{
    try{
        const forms =await Form.find();
        res.status(200).json(forms);
    }
     catch(error){
                console.log(error.message);
                res.status(500).json({message: "error"});

     }
};

