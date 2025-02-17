import mongoose from "mongoose";

const Connection = async (username, password) => {

    const URL = `mongodb+srv://${username}:${password}@cluster0.mvr9p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('DataBase connected Sucessfully');
    } catch (error) {
        console.log('Error while connecting to mongoDB', error);
    }

}

export default Connection;