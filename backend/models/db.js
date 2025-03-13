const mongoose = required(mongoose)

const mongo_url = Process.env.MONGO_CONNECT;

mongoose.connect(mongo_url) 
     .then(()=> {
        console.log("connted to database");
     }).catch((err) => {

     })
     