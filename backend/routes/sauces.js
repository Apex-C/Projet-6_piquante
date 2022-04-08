
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.route('/').post(auth, multer, sauceCtrl.createScauce).get(auth, sauceCtrl.getAllStuff)
router.route('/:id').put(auth, multer, sauceCtrl.modifySauce).get(auth, sauceCtrl.getOneThing).delete(auth, sauceCtrl.deleteThing)
router.route('/:id/like').post(auth, sauceCtrl.likeSauce)


module.exports = router;

