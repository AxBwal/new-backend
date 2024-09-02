const mongoose=require("mongoose")

const Database=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DataBase Connected Successfully");
        
    } catch (error) {
        console.log("Database is not connected");
        
    }
}

module.exports=Database