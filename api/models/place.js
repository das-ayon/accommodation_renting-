const mongoose  = require('mongoose');

const placeSchema= new mongoose.Schema({
   owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'        
    }, 
   title: String,
   address: String,
   addedPhotos:[String],
   description: String,
   perks: [String],
   extraInfo: String,
   checkin: Number,
   checkout: Number,
   maxGuests:Number,
}); 

const PlaceModel= mongoose.model('Place',placeSchema);
module.exports = PlaceModel;