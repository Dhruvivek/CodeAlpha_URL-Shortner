import mongoose from "mongoose";

const url = new mongoose.Schema({
    url:{
        type:String,
        required: true,
    },
    shortCode:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:'30d'
    }
    
})

export default mongoose.model('URL',url);
