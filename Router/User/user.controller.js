const { 
    searchRestuarant, getCuisinesDetails
} = require('../../Model/model')


const SearchRestuarant = async(req, res)=>{
    await searchRestuarant(req, res);
}

const GetCuisinesDetails = async(req, res)=>{
    await getCuisinesDetails(req, res);
}

module.exports = {   
    SearchRestuarant,
    GetCuisinesDetails,
} 