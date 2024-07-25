const express = require('express');
var router = express.Router();
const Blog =require('./../models/blogs');
router.post('/post',async (req,res)=>{
    try{
       const data = req.body;
       const newBlog = new Blog(data);
       const response = await newBlog.save();
       res.status(200).json(response);
       console.log('Data posted to server sucessfully')

    }catch(err){
            console.error('Error in posting blog:', err.message); 
            res.status(500).json({ error: 'Internal Error in posting blog' });
        }
 });



router.get('/show', async (req, res) => {
    try {
        const data = await Blog.find();
        console.log('Fetched data'); 
        
        if (!data || data.length === 0) {
            console.log('No data found');
            return res.status(404).json({ error: 'No blogs found' });
        }
        
        res.status(200).json(data);
    } catch (err) {
        console.error('Error in getting blogs:', err); 
        res.status(500).json({ error: 'Error in getting blogs' });
    }
});

router.get('/show/:id', async(req,res)=>{
    try{
    const blogId = req.params.id;
    const blogData =await Blog.findById(blogId)
    if(!blogData){
        console.log('Blog post not found');
        return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(blogData)
    } catch (err) {
        console.error('Error in getting blogs:', err); 
        res.status(500).json({ error: 'Error in getting blogs' });
    }
})

       router.get('/', (req, res) => {
       try{
        res.send('Hello World!')}
       catch(err){console.log("Error in geting /")}
       })

router.delete('/:id',async (req,res)=>{
    try{
    const ID = req.params.id;
    if(!ID){
        console.log(" Blog Id is requires")
        res.status(500).json({message:"Id requires"})
    }
    const Find =await Blog.findById(ID)
    if(!Find){
        console.log(" Blog Id not Found")
        res.status(500).json({message:"Invalid Id"})
    }
    const Done =await Blog.findByIdAndDelete(ID)
    res.status(200).json({message:"Deleted"})
}
catch(err){
        console.error('Error in Deleting blogs:', err); 
        res.status(500).json({ error: 'Error in deleting blogs' });
}
})


module.exports=router;