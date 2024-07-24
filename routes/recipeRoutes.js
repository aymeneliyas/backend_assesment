const express = require('express');
const recipeController = require('../controllers/recipeController')


const router = express.Router();

router.post('/addRecipe/:userId', recipeController.addRecipe);
router.get('/getRecipeById/:id', recipeController.getRecipe);
router.get('/getRecipeByTitle/:title',recipeController.getRecipeByTitle);
router.get('/getListOfRecipes',recipeController.getAllRecipes); 
router.put('/updateRecipe/:id',recipeController.updateRecipe);
// router.delete('/deleteRecipe/:id',recipeController..;


module.exports = router;