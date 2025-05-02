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
        // Fetch food items
        const foodCollection = db.collection("food_items");
        const foodData = await foodCollection.find({}).toArray();

        // Fetch food categories
        const categoryCollection = db.collection("foodCategory");
        const categoryData = await categoryCollection.find({}).toArray();

        if (!foodData.length || !categoryData.length) {
            console.log("One or more collections are empty.");
        }

        global.food_items = foodData;
        global.foodCategory = categoryData;

        console.log("Food items and categories loaded globally.");

    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err.message);
    }
};


module.exports = mongoDB;