const { DataTypes } = require('sequelize');

const Post = {
        schema: {
            title: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        tableName: "Post"
    }

module.exports = Post;