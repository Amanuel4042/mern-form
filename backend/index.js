
import express  from "express";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Form} from './models/formModel.js';
import cors from "cors";
import formRoutes from "./routes/formRoutes.js";


const port= 5000;
const app =express(); 

app.use(express.json()); 
app.use(cors());



mongoose.connect(mongoDBURL)
.then(() => { console.log("app connected to database");

    
app.use("/",formRoutes);


app.listen(port,() =>   {
    console.log(`app is listening on port ${port}`);
});
})

