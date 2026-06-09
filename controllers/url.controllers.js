import URL from "../models/url.models.js";
import { nanoid } from "nanoid";

export const createURL = async (req, res) => {
    const { url, customCode } = req.body;
    if (!url) {
        return res.status(400).json({ message: "Url is required" });
    }

    try {
        const shortCode = customCode || nanoid(6);
        if (customCode) {
            const existingCode = await URL.findOne({ shortCode: customCode });
            if (existingCode) {
                return res.status(400).json({ message: "Custom code already exists provide something unique" });
            }
        }
        const existingUrl = await URL.findOne({ url });
        if (existingUrl) {
            return res.status(200).json({
                message: "Url already exists", shortCode: existingUrl.shortCode, shortUrl: `${process.env.BASE_URL}/${existingUrl.shortCode}`
            });
        }

        const newUrl = await URL.create({ url: url, shortCode: shortCode });
        res.status(201).json({ message: "Url created successfully",shortCode, shortUrl: `${process.env.BASE_URL}/${shortCode}` });


    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const redirectURL = async (req, res) => {
    const { code } = req.params;
    try {
        const url = await URL.findOne({ shortCode: code });
        if (!url) {
            return res.status(404).json({ message: "Url not found" });
        }
        else {
            res.redirect(url.url);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

