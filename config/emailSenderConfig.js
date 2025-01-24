import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv()

console.log(process.env.MAIL_PROVIDER, process.env.MAIL_USER_PASSWORD)
const mailTransporter = nodemailer.createTransport({
    host: process.env.MAIL_PROVIDER,
    port: process.MAIL_PROVIDER_PORT,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_USER_PASSWORD
    },
    logger: true,
    debug: true
})

export default mailTransporter;

