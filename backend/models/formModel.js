import mongoose from "mongoose";

const formSchema =new mongoose.Schema({
    name:{

        type: String ,
        required: true
    },
      email:{
        
        type: String ,
        required: true
    },
      gender:{
        
        type: String ,
        required: true
    },
      interests:{
        
        type: [String] ,
        required: true
    },
      date:{
        
        type: Date ,
        required: true
    },
      color:{
        
        type: String ,
        required: true
    },
      age:{
        
        type: Number,
        required: true
    },
      message:{
        
        type: String ,
        required: true
    },

    photoURL:{
        
        type: String,
        required: true
    }
})

export const Form = mongoose.model("Form",formSchema);


