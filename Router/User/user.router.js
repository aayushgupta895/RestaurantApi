const express = require('express');
const { SearchRestuarant, GetCuisinesDetails } = require('./user.controller');

const userRouter = express.Router();


//----------------------------search the restaurant----------------

userRouter.post('/searchRestaurant', SearchRestuarant);

//-------------view the dishes available in restaurants-------------

userRouter.get('/:restaurant_title/getCuisinesDetails', GetCuisinesDetails)



module.exports = userRouter
 
 