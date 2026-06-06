import URL from "../models/url.models.js";
import {nanoid} from "nanoid";

export const createURL = async(req,res)=>{
    const {url} = req.body;
    if(!url){
        return res.status(400).json({message:"Url is required"});
    }
    try{
        const shortCode = nanoid(6);
        const newUrl = await URL.create({url:url,shortCode:shortCode});
        res.status(201).json({shortCode,shortUrl:`${process.env.BASE_URL}/${shortCode}`});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const redirectURL=async (req,res) =>{
    const {code} = req.params;
    try{
        const url = await URL.findOne({shortCode:code});
        if(!url){
            return res.status(404).json({message:"Url not found"});
        }
        else{
            res.redirect(url.url);
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

