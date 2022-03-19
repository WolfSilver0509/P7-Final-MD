const ModelManager = require("../models/index");

const mm = new ModelManager();

const Post = mm.getModel("Post");

const User = mm.getModel("User");

const Comment = mm.getModel("Comment");

const fs = require("fs");

exports.createPost = (req, res, next) => {
  let fileName = null;
  if (req.file != null) {
    fileName = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  const post = Post.create({
    title: req.body.title,
    content: req.body.content,
    image: fileName,
    UserId: req.token.userId,
  })

    .then(() => {
      console.log("Post enregistré");
      res.status(200).json({ message: "demande de post acceptée" });
    })
    .catch((error) => {
      console.log("error in controller/posts.js : " + error);
      res.status(500).json({ error: error });
    });
};

exports.getAllPost = async (req, res, next) => {
  const PostsResult = await Post.findAll({
    include: [
      { model: User, attributes: ["id", "firstName"] },
      { model: Comment, include: User },
    ],

    order: [
      ['updatedAt', 'DESC'],[Comment, 'updatedAt', 'DESC']
  ],
  }); //Recups de tous les postes

  res.status(200).json(PostsResult);
};

exports.getPost = async (req, res, next) => {
  const PostsResult = await Post.findOne({
    where: { id: req.params.id },
    include: [
      { model: User, attributes: ["id", "firstName"] },
      { model: Comment, include: User},
    ],
  }); //Recups d'un post avec son id

  res.status(200).json(PostsResult);
};
/**
 * Mise a jour du post
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.updatePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (post.UserId === req.token.userId || req.token.isAdmin) {
    const postObject = {
      ...req.body,
    };
    if(req.file){
        if (post.image){
          const filename = post.image.split("/images/")[1];
         fs.unlink(`images/${filename}`,()=>{
          console.log("Image SUpp");
         })
        }
        
        postObject.image=`${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }

      console.log(postObject);
      post
        .update(postObject, { where: { ...postObject, id: req.params.id } })
        .then(() => {
          console.log("post mis à jour");
          res.status(200).json({
            title: postObject.title,

            message: "post mis à jour !",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ message: "Erreur actualisation de Post" });
        });
   
  }
  else {
    res
      .status(401)
      .json({ message: " Vous n'avez pas les droits de modification de post" });
  }
};

//Supression d'un post
exports.deletePost = async (req, res) => {
  const post = await Post.findOne({ where: { id: req.params.id } });

  if (post.UserId === req.token.userId || req.token.isAdmin) {
    if(post.image){

    const filename = post.image.split("/images/")[1];
    fs.unlink(`images/${filename}`, async() => {
      try {
         await post.destroy();
      } catch (error) {
        res.status(400).json({ message: "Erreur suppression Post" });
      }
      res.status(203).json({ message: "Post supprimé" });
    });
  } else {
    await post.destroy();
    res.status(203).json({ message: "Post supprimé" });
  }
  }
  
  else {
    return res
      .status(400)
      .json({ message: "Erreur je ne peut pas supprimé ce post" });
  }
};
