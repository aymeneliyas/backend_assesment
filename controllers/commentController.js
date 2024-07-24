const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient() 

const addComment = async (req, res) => {
    const {content, userId, recipeId, author, date} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });

    const recipe = await prisma.recipe.findUnique({
        where: {
            id: recipeId,
        }
    });

    if(!user){
        res.status(404).json({message: 'User not found'});
    }
    else if(!recipe){
        res.status(404).json({message: 'Recipe not found'});
    }
    else{
        //change date to date type

        const newDate = DateTime(date)
        const newComment = await prisma.comment.create({
            data: {
                content,
                userId,
                recipeId,
                author,
                date : newDate

            }
        });

        res.status(201).json({message: 'Comment added successfully', newComment});
    }
}

module.exports = {addComment}