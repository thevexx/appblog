const router = require ('express').Router();
const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/blogdb',{
    useNewUrlParser: true,
    useCreateIndex: true,
});

const articleSchema = require('../Models/article');
const articleModel = mongoose.model('article', articleSchema);

const commentSchema = require('../Models/comment');
const commentModel = mongoose.model('comment', commentSchema);

// add article
router.post('/article', async(req,res)=>{
    const result = await articleModel.create(req.body);
    res.send(result);
});

// get all articles
router.get('/article', async(req,res)=>{
    const result = await articleModel.find().populate({path: 'author'}).populate({path: 'comments'}); //(populate) les donneés de l'user par id
    res.send(result);
});

// get article by id    
router.get('/article/:id', async(req,res)=>{
    const result = await articleModel.findById({_id: req.params.id}).populate({path: 'author'}).populate({path: 'comments'}); 
    res.send(result);
});


// get aricles by userId
router.get('/user/:userid', async(req,res)=>{
    const result = await articleModel.findById({auther : req.params.userid}).populate({path: 'author'}).populate({path: 'comments'}); 
    res.send(result);
});
// update article by id

router.put('/article/:id', async(req,res)=>{
    const result = await articleModel.updateOne({_id : req.params.id}, {$set : req.body}); 
    res.send(result);
});

// remove article
router.delete('/article/:id', async(req,res)=>{
    const result = await articleModel.remove({_id: req.params.id}); 
    res.send(result);
});

// add comment
router.post('/comment/:idArticle', async(req,res)=>{
    const result = await commentModel.create(req.body);
    const result2 = await articleModel.updateOne({_id:req.params.idArticle}, {$push:{comments: result._id}})
    res.send(result2);
});

// delete comment

router.delete('/comment/:id', async(req,res)=>{
    
    const result = await commentModel.remove({_id:req.params.id});
    res.send(result);
});

module.exports = router;     