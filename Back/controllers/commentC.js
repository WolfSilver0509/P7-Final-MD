const ModelManager = require("../models/index");
const Post = require("../models/post");

const mm = new ModelManager();

const Comment = mm.getModel("Comment");
const User = mm.getModel("User");
const fs = require("fs");

exports.createCom = (req, res, next) => {
  const _AuthUserId = req.token.userId;
  let fileName = null;
  if (req.file != null) {
    fileName = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;
  }
  const Com = Comment.create({
    content: req.body.content,
    UserId: _AuthUserId,
    image: fileName,
    PostId: req.body.postId,
  })

    .then(() => {
      console.log("Com enregistré");
      res.status(200).json({ message: "demande de Com acceptée" });
    })
    .catch((error) => {
      console.log("error in controller/Coms.js : " + error);
      res.status(500).json({ error: error });
    });
};

// "commentaire/:id"
exports.getComment = async (req, res, next) => {
  const _AuthUserId = req.token.userId;
  const CommentsResult =
    (await Comment.findOne({
      where: { id: req.params.id },
      include: [
        { model: User, attributes: ["id", "firstName"] },
      ],
    })) || null; //Recups tout les Comments

  if (!CommentsResult) return res.status(404).json({ message: "not found" });

  res.status(200).json(CommentsResult);
};

exports.updateComment = async (req, res, next) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (comment.UserId === req.token.userId || req.token.isAdmin) {
    const CommentObject = {
      ...req.body,
    };
    if (req.file) {
      if (comment.image) {
        const filename = comment.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          console.log("Image SUpp");
        });
      }
      CommentObject.image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    console.log(CommentObject);
    comment
      .update(CommentObject, { where: { ...CommentObject, id: req.params.id } })
      .then(() => {
        console.log("Commentaire mis à jour");
        res.status(200).json({
          title: CommentObject.title,

          message: "Commentaire mis à jour !",
        });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .json({ message: "Erreur actualisation du Commentaire" });
      });
  } else {
    res
      .status(401)
      .json({
        message: " Vous n'avez pas les droits de modification du Commentaire",
      });
  }
};

//Supression d'un commentaire
exports.deleteCom = async (req, res) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (comment.UserId === req.token.userId || req.token.isAdmin) {
    if (comment.image) {
      const filename = comment.image.split("/images/")[1];

      fs.unlink(`images/${filename}`, () => {
        try {
          comment.destroy();
        } catch (error) {
          res
            .status(400)
            .json({ message: "Erreur suppression de commentaire" });
        }
        res.status(203).json({ message: "Commentaire supprimé" });
      });
    } else {
      comment.destroy();
      res.status(203).json({ message: "Commentaire supprimé" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Erreur je ne peut pas supprimé ce commentaire" });
  }
};
