const admin = require("firebase-admin");
const db = admin.firestore();
const userValidationSchema = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    // Validate input
    const { error, value } = userValidationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const messages = error.details.map(e => e.message);
      return res.status(400).json({ error: messages });
    }

    // Check for unique email
    const emailSnapshot = await db
      .collection("users")
      .where("email", "==", value.email)
      .get();
    if (!emailSnapshot.empty) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // ✅ Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(value.password, saltRounds);

    // Replace plaintext password with hashed one
    value.password = hashedPassword;

    // Save
    const docRef = db.collection("users").doc();
    await docRef.set(value);

    // ✅ Don't return hashed password in response
    const { password, ...safeData } = value;

    res.status(201).json({
      id: docRef.id,
      ...safeData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const docRef = db.collection("users").doc(userId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = doc.data();

    if (userData.birthdate && userData.birthdate.toDate) {
        userData.birthdate = userData.birthdate.toDate();
    }
    if (userData.createdAt && userData.createdAt.toDate) {
        userData.createdAt = userData.createdAt.toDate();
    }

    // Don't return hashed password
    const { password, ...safeData } = userData;

    res.status(200).json({
      id: docRef.id,
      ...safeData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};