import Queue from "bull"
import { sendMail } from "../utils/emailSender.js"

const emailQueue = new Queue("emailQueue", {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    limiter: {
        max: 10,
        duration: 1000
    }
})

async function emailJob(job){
    console.log(`processing job ${job.id} for ${job.data.to}`);
    try {
        const { to, subject, text, html } = job.data;
        const emailOptions = {from: process.env.MAIL_USER, to, subject, text, html}
        await sendMail(emailOptions);
        console.log(`Email sent to ${to}`)
    } catch (err) {
        console.error(`Error sending email: ${err.message}`);
        if (job.attemptsmade > 3 ) throw err;
    }
}

emailQueue.process(emailJob);

emailQueue.on("failed", (job, err)=> {
    console.error(`Job ${job.id} failed: ${err.message}`)
})

export default emailQueue;