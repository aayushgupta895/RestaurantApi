const { 
    createRestaurant,
    deleteRestaurant,
    getAllRestaurant,
    addCuisines,
    getCuisine,
    deleteCuisine,
    updateCuisine,
    addPictures,
} = require('../../Model/model')


const CreateRestaurant = async(req, res) =>{
    await createRestaurant(req, res);
}

const DeleteRestaurant = async(req, res) =>{
    await deleteRestaurant(req, res);
}

const GetAllRestaurant = async(req, res) =>{
    await getAllRestaurant(req, res);
} 

const AddCuisines = async(req, res) =>{
    await addCuisines(req, res);
}

const GetCuisine = async(req, res) =>{
    await getCuisine(req, res);
}

const DeleteCuisine = async(req, res) =>{
    await deleteCuisine(req, res);
}

const UpdateCuisine = async(req, res) =>{
    await updateCuisine(req, res);
}

const AddPictures = async(req, res)=>{
    await addPictures(req, res);
}


module.exports = {
    CreateRestaurant,
    DeleteRestaurant,
    GetAllRestaurant,
    AddCuisines,
    GetCuisine,  
    DeleteCuisine,
    UpdateCuisine,
    AddPictures,
}