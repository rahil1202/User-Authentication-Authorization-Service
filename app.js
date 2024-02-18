const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();

// Connect to the database
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/usersdb', {
      // useNewUrlParser: true, // no longer needed because mongoose v5.7.1+ default is true
      // useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();

mongoose.connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.log('Unhandled Rejection:', error.message);
  // Handle or log the error as needed
});

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use(userRoutes);

// Setup server to listen on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
