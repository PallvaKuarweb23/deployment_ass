const express=require("express")
const {ArticlesModel}=require("../model/Articles.model")

const articleRouter=express.Router()

articleRouter.post("/articles/add",async(req,res)=>{
    try{
        const article=ArticlesModel(req.body)
        await article.save()
        res.status(200).send({"msg":"Article is added"})

    }catch(err){
        res.status(200).send({"msg":err.message})

    }
})



articleRouter.get("/articles/:id",async(req,res)=>{
try{
const article=await ArticlesModel.find();
res.status(200).send(article)
}catch(err){
    res.status(200).send({"msg":err.message})
}
})



articleRouter.patch("/articles/edit/:id",async(req,res)=>{
try{
const id=req.params.id;
const updatearticle=await ArticlesModel.findByIdAndUpdate(
    id,
    req.body,
    {new:true}
);
res.status(200).send(updatearticle);
}catch(err){
    res.status(200).send({"msg":err.message})
}
})


articleRouter.delete("/articles/rem/:id",async(req,res)=>{
try{
const id=req.params.id;
await ArticlesModel.findByIdAndDelete(id);
res.status(200).send({"msg":"Deletes a specific article"})


}catch(err){
    res.status(400).send({"msg":err.message})

}
})


module.exports={
    articleRouter
}