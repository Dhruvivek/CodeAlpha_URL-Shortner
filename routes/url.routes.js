import {createURL} from "../controllers/url.controllers.js";
import {redirectURL} from "../controllers/url.controllers.js";
import express from "express";
const router = express.Router();

router.post("/shorten",createURL);

router.get("/:code",redirectURL);

export default router;

