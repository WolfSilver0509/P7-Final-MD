const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const comCtrl = require('../controllers/commentC');

const multer = require('../middlewares/multer-config')

router.post('/', auth,multer,comCtrl.createCom);
router.get('/:id', auth,comCtrl.getComment);
router.put('/:id', auth,multer,comCtrl.updateComment);
router.delete('/:id', auth,multer,comCtrl.deleteCom);


module.exports = router;