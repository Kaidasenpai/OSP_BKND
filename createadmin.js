// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin'); // <-- Adjust path if needed
const uri = "mongodb+srv://kaidasenpai:Ghythrf1@cluster0.xerjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function createAdmin() {
  try {
    // 1) Connect to your MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected for admin creation');

    // 2) Hash the admin password
    const plainPassword = 'admin123'; // <--- your desired password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 3) Create an Admin document
    const newAdmin = await Admin.create({
      username: 'admin', // <--- your desired username
      passwordHash: hashedPassword,
    });

    console.log('Admin user created:', newAdmin);
  } catch (error) {
    console.error(error);
  } finally {
    // 4) Close the DB connection
    mongoose.connection.close();
  }
}

createAdmin();
