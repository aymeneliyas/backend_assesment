const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient() 

const addRecipe = async (req, res) => {
    const {title, ingredients, instructions , preparationTime} = req.body;
    const userId = req.params.userId
    const recipe = await prisma.recipe.create({
        data: {
            title,
            ingredients,
            instructions,
            preparationTime,
            userId
        }
    });

    res.status(201).json({message: 'Recipe added successfully', recipe});
}

const getRecipe = async (req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: req.params.id,
        }
    })

    if(!recipe){
        res.status(404).json({message: 'Recipe not found'});
    }
    else{
        res.status(200).json({message: 'Recipe found', recipe});
    }
}

const getRecipeByTitle = async (req,res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            title: req.params.title,
        }
    })

    if(!recipe){
        res.status(404).json({message: 'Recipe not found'});
    }
    else{
        res.status(200).json({message: 'Recipe found', recipe});
    }
}

const getAllRecipes = async (req, res) => {
    const recipes = await prisma.recipe.findMany();

    res.status(200).json({message: 'All recipes', recipes});
}

const updateRecipe = async (req, res) => {
    const {title, ingredients, instructions , preparationTime} = req.body;
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    });

    if(!recipe){
        res.status(404).json({message: 'Recipe not found'});
    }
    else{
        //get id from the token of the request
        const id = req.user.id;
        if(id == recipe.userId){
            const updatedRecipe = await prisma.recipe.update({
                where: {
                    id: parseInt(req.params.id),
                },
                data: {
                    title,
                    ingredients,
                    instructions,
                }
            });

            res.status(200).json({message: 'Recipe updated successfully', updatedRecipe});
        }
        res.status(200).json({message: 'Recipe updated successfully', updatedRecipe});
    }
}

const deleteRecipe = async(req, res) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: parseInt(req.params.id),
        }
    });

    if(!recipe){
        res.status(404).json({message: 'Recipe not found'});
    }
    else{
        //get id from the token of the request
        const id = req.user.id;
        if(id == recipe.userId){
            await prisma.recipe.delete({
                where: {
                    id: parseInt(req.params.id),
                }
            });

            res.status(200).json({message: 'Recipe deleted successfully'});
        }
        res.status(200).json({message: 'Recipe deleted successfully'});
    }
}

module.exports = {
    addRecipe,
    getRecipe,
    getRecipeByTitle,
    getAllRecipes,
    updateRecipe
}