const sequelize = require('./connector');
const { DataTypes } = require('sequelize');

const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

class ModelManager {
    constructor(){
    }

    init(){
        const user = sequelize.define(User.tableName, User.schema, {
            tableName: User.tableName
        })

        const post = sequelize.define(Post.tableName, Post.schema, {
            tableName: Post.tableName
        })

        const comment = sequelize.define(Comment.tableName, Comment.schema, {
            tableName: Comment.tableName
        })
        

        try {
            user.hasMany(post,{ onDelete: 'cascade', hooks:true })
            post.belongsTo(user)
        
            post.hasMany(comment ,{ onDelete: 'cascade', hooks:true })
            comment.belongsTo(post)

            user.hasMany(comment,{ onDelete: 'cascade', hooks:true })
            comment.belongsTo(user)
        } catch (error) {
            console.log(error)
        }
    }

    getModels(){
        return sequelize.models;
    }

    getModel(str){
        return sequelize.models[str];
    }
}

module.exports = ModelManager

