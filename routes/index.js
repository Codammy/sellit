import express from 'express'
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/status', function (req, res) {
  return res.json({status: 'alive'})
})
export default router;