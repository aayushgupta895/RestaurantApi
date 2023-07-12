const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  title : {
    required : true,
    type : String
  },
  subTitle : {
    required : true,
    type : String
  },
  name : {
    required : true,
    type : String
  },
  address : {
    required : true,
    type : String,
  },
  phone : {
    required : true,
    type : [Number],
  },
  foodAvailable : {
    required : true,
    type : Boolean
  },
  cuisinesAvailable : {
    required : true,
    type : [String]
  }
});

const CuisineSchema = new mongoose.Schema({
  name: {
    required : true,
    type : String,
  },
  
  restaurants : [{

    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant' 
    },
    description : {
        required : true,
        type : String,
    },
    veg : {
        required : true,
        type : Boolean,
    },
    ingredients : {
        required : true,
        type : [String],
    },
    pictures :[{
      pic : {
        type : Buffer,
      }
    }],
    price : {
        required : true,
        type : Number,
    },
    discount : {
        required : true,
        type : Number,
    },
    currentlyAvailable : {
        required : true,
        type : Boolean,
    }
  }],
});



const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
const Cuisine = mongoose.model('Cuisine', CuisineSchema);


module.exports = {
  Restaurant, 
  Cuisine,
}