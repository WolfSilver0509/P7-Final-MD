const { DataTypes } = require('sequelize');

const Comment = {
    schema: {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
                allowNull: true }
    },
    tableName: "Comment"
} 
 
module.exports = Comment;