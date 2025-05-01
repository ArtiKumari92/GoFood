const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://artiyadav574:nOYTWfWUVnW1lm8R@merncluster.m9ojgqm.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=MernCluster';

const mongoDB = async () => {
    try {
        // Enable detailed Mongoose operation logs (optional)
        // mongoose.set('debug', true);

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;
        const foodCollection = db.collection("food_items");

        const data = await foodCollection.find({}).toArray();

        if (data.length === 0) {
            console.log("No food items found in the collection.");
        } else {
            //console.log("Fetched food items:", data);
            console.log("Fetched food items:");
        }

    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err.message);
    }
};

module.exports = mongoDB;