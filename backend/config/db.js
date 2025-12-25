const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        //connect to MongoDB sing MONGO_URI in .env 
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
       console.error(`Error: ${error.message}`);
       //Exit with failure if connection fails
       process.exit(1);        
    }
};

module.exports= connectDB;