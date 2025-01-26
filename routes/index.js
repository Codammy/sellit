import express from 'express'
import login from '../controllers/AuthController.js';
import mongoose from 'mongoose';
import { redisClient } from '../bin/www';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/status',  function (req, res) {
  const dbStatus = mongoose.connection.readyState;
  const redisStatus = redisClient.isReady
  console.log(redisStatus)
  return res.json({connections: {
    server: true,
    db: dbStatus,
    redis: redisStatus
  }})
})

router.post('/login', login)
export default router;