const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/postC');

const multer = require('../middlewares/multer-config')

router.post('/', auth, multer,postCtrl.createPost);
router.get('/',auth,postCtrl.getAllPost);
router.get('/:id',auth,postCtrl.getPost);
router.put('/:id', auth,multer,postCtrl.updatePost);
router.delete('/:id', auth,multer,postCtrl.deletePost);


module.exports = router;