import mailTransporter from "../config/emailSenderConfig.js";
import ejs from 'ejs';
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import {__dirname} from '../app.js'

export async function sendMail({from= '', to='', subject='', text='', html=''}) {
    console.log(from)
        const info = await mailTransporter.sendMail({
        from,
        to,
        subject,
        text,
        html
    });
};