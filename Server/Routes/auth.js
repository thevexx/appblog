const router = require ('express').Router();
const mongoose = require ('mongoose');
const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcrypt');

mongoose.connect('mongodb://localhost:27017/blogdb',{
    useNewUrlParser: true,
    useCreateIndex: true,
});

const userSchema = require('../Models/user');
const userModel = mongoose.model('user', userSchema);

router.post('/registered', async(req, res) =>{
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const result = await userModel.create(req.body);
    res.send(result);
})

router.post('/login', async(req, res) => {
    
    const resultlogin = await userModel.findOne({email: req.body.email});
    if(!resultlogin){res.send('address mail not existing');}
    if(!bcrypt.compareSync(req.body.password, resultlogin.password)){res.send('wrong password');}
    const token = jwt.sign({data:resultlogin}, 'Hello', {algorithm: "HS384"});
    res.send({message:'ok', usertoken : token});
})


router.get('/registered', async(req, res) =>{
    const result = await userModel.find();
    res.send(result);
})


module.exports = router;