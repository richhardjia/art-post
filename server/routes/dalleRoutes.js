import express from "express";
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();


router.route('/').get((req,res) => {
    res.send('Dalle api test');
});

router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;
        const inputData = {
            inputs: prompt,
            options: {
                wait_for_model: true
            }
        };

        const response = await axios({
            url: "https://api-inference.huggingface.co/models/Pclanglais/Mickey-1928",
            method: 'POST', 
            headers: {
                Authorization: `Bearer ${process.env.HF_API_KEY}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(inputData),
            responseType: 'arraybuffer',
        })

        const mimeType = response.headers['content-type'];
        const result = response.data;
        const base64data = Buffer.from(result).toString('base64');
        const image =  `data:${mimeType};base64,` + base64data;

        res.status(200).json({photo:image});
    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message)
    }
})

export default router;