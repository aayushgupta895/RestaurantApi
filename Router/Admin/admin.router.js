const express = require('express');
const multer = require('multer');
const { 
        CreateRestaurant, 
        DeleteRestaurant, 
        GetAllRestaurant,
        AddCuisines,
        GetCuisine,
        DeleteCuisine,
        UpdateCuisine,
        AddPictures,
    } = require('./admin.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const adminRouter = express.Router();

//-------------------------Creating the restraunt----------------

adminRouter.post('/createRestaurant', CreateRestaurant);


//-------------------------deleting the restaurant-------------

adminRouter.post('/deleteRestaurant', DeleteRestaurant);

//--------------------get all restaurants--------------------

adminRouter.get('/getAllRestaurant', GetAllRestaurant);

//---------------------add cuisines --------------------------

adminRouter.post('/:restaurant_title/addCuisines', AddCuisines);

//---------------get cuisine-----------------------------------

adminRouter.post('/getCuisine', GetCuisine);

//---------------delete cuisine-----------------------------------

adminRouter.post('/:restaurant_title/deleteCuisine', DeleteCuisine);

//---------------------------update cuisines---------------------

adminRouter.post('/:restaurant_title/updateCuisine', UpdateCuisine);

//---------------------------upload cuisine pics of Cuisine for each restaurants---------------------

adminRouter.post('/:restaurant_title/addPictures', upload.array('pictures'),  AddPictures)


module.exports = adminRouter          