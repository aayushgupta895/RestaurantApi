

const { Restaurant, Cuisine } = require('./mongoSchema')


const asyncErrorHandler = (func) => (req, res) => func(req, res).catch(error => {
    console.log(error);
    res.status(500).send({"error" : "Internal server error"})
});


//--------------------------------user--------------------

const searchRestuarant =  asyncErrorHandler(async (req, res) =>{
    const body = req.body
    const restaurantSearchResult = await Restaurant.find({$or : [{title : body['title']}, {name : body['name']}]});
    if(restaurantSearchResult.length == 0){
        return res.send({
            message : "No matching restaurant found"
        })
    }
    res.status(200).send(restaurantSearchResult);
});


const getCuisinesDetails = asyncErrorHandler(async (req, res) =>{
    const cuisines = await Restaurant.findOne({title : req.params.restaurant_title}, {cuisinesAvailable : 1, _id : 0});
    res.status(200).send(cuisines);
})



//---------------------------------admin---------------------------

const createRestaurant = asyncErrorHandler (async (req, res)=>{
    
        const body = req.body
        const title = await Restaurant.findOne({title : body['title']});
        
        if(title){
            console.log(title);
            return res.status(200).send({
                message : 'Need to choose another title as it has already been taken'
            })
        }
        const newRestaurant = await Restaurant.create({
            title : body['title'],
            subTitle : body['subTitle'],
            name : body['name'],
            address : body['address'],
            phone : [...body['phone']],
            foodAvailable : body['foodAvailable'],
            cuisinesAvailable : [...body['cuisinesAvailable']]
        });
        res.status(201).send(newRestaurant);
})


const deleteRestaurant = asyncErrorHandler(async(req, res)=>{

    const deletedRestaurant = await Restaurant.deleteOne({title : req.body['title']});
    return res.status(204).send(deletedRestaurant);

})

const getAllRestaurant = asyncErrorHandler(async(req, res)=>{

   const restaurants = await Restaurant.find({});
   console.log(restaurants)
   return res.status(204).send(restaurants);

})

const addCuisines = asyncErrorHandler( async (req, res)=>{

    const body = req.body;
    const restaurant_title = req.params.restaurant_title;

    const updated_restaurant = await Restaurant.findOneAndUpdate({title : restaurant_title}, {$push : {cuisinesAvailable : body['cuisine']}}, {new : true});
    console.log(updated_restaurant);

    const cuisine_available = await Cuisine.findOne({name : body['cuisine']});

    const restaurants = {
        restaurantId : updated_restaurant['_id'],
        description : body['description'],
        veg : body['veg'],
        ingredients : [...body['ingredients']],
        pictures : [...body['pictures']],
        price : body['price'],
        discount : body['discount'],
        currentlyAvailable : body['currentlyAvailable']
    }

    const cuisine = cuisine_available == null ? 
    await Cuisine.create({
        name : body['cuisine'],
        restaurants : [restaurants]
    }) : await Cuisine.findOneAndUpdate(
        {name : body['cuisine']}, 
        {$push : {restaurants : restaurants}},{new : true}
    );

    res.status(201).send(cuisine);
})

const getCuisine = asyncErrorHandler (async (req, res) =>{

    const cuisineDetails = await Cuisine.findOne({name : req.body['name']});
    res.status(200).send(cuisineDetails);

});

const deleteCuisine = asyncErrorHandler(async (req, res) =>{

    const body = req.body;
    const restaurant_title = req.params.restaurant_title;
    const restaurant = await Restaurant.findOneAndUpdate({title : restaurant_title}, {$pull : {cuisinesAvailable : body['cuisine']}});
    const cuisineDetails = await Cuisine.findOneAndUpdate({name : body['cuisine']},{ $pull : {restaurants : {restaurantId : restaurant['_id']}}}, {new : true, upsert : true});
    res.status(204).send(cuisineDetails);   

})


const updateCuisine = asyncErrorHandler(async (req, res)=>{

    const body = req.body
    const restaurant = await Restaurant.findOne({title : req.params.restaurant_title});
    console.log(restaurant);
    const updatedCuisine = await Cuisine.findOneAndUpdate(
            { name : body['cuisine'], "restaurants.restaurantId" : restaurant['_id']},
            { $set : { "restaurants.$.price" : body['price'], "restaurants.$.discount" : body['discount'], "restaurants.$.ingredients" : [...body['ingredients']], "restaurants.$.currentlyAvailable" : body['currentlyAvailable']} },
            {new : true}
        );  
  
    res.status(200).send(updatedCuisine);    

})     

const addPictures = asyncErrorHandler(async (req, res)=>{
    const pictureFiles = req.files;
    
    const pictures = pictureFiles.map(file => ({
        pic : file.buffer
    }));

    const restaurant = await Restaurant.findOne({title : req.params.restaurant_title});

    const updatedCuisine = await Cuisine.findOneAndUpdate(
        { name : req.body['cuisine'], "restaurants.restaurantId" : restaurant['_id']},
        { $push : { "restaurants.$.pictures" : [...pictures]} },
        {new : true}
    ); 
    res.send(updatedCuisine);
})
     
module.exports = {
    createRestaurant,
    searchRestuarant,
    deleteRestaurant,
    getAllRestaurant,
    addCuisines,
    getCuisine,
    deleteCuisine,
    updateCuisine,
    getCuisinesDetails,
    addPictures,
 }