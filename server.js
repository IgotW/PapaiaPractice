// Load firebase-admin SDK
const admin = require("firebase-admin");
const express = require("express");
const app = express();

app.use(express.json());

// Load your service account key
const serviceAccount = require("./config/serviceAccountKey.json");

// Initialize the app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Get Firestore reference
const db = admin.firestore();

//this is a route for testing the connection
const userRoutes = require("./routes/userRoute");
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));