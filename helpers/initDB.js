//Here we will connect to our database


//heysuraj1
//cKhAaRV9WPRuHsKR

//mydusraecom




// mongodb+srv://heysuraj1:<password>@cluster0.pwi8w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
import mongoose from 'mongoose'


function initDB(){
    if(mongoose.connections[0].readyState){
        console.log('Already Connected')
        return
    }

    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection.on('connected',()=>{
        console.log('Connected To The Database')
    })
    mongoose.connection.on('error',()=>{
        console.log('Not Connected To The Database')
    })
}


export default initDB