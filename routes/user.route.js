var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: './public/uploads/' });
var router = express.Router();

module.exports = router;

router.get('/',controller.index);

router.get('/cookie', function(req,res,next){
    res.cookie('user-id',12345);
    res.send('hello');
});

router.get('/search', controller.search)



router.get('/create', controller.create)

router.get('/:id',controller.view)

router.post('/create',
    upload.single('avatar'),
    validate.postCreate, 
    controller.pushUser
    );
module.exports = router;