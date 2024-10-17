/* eslint-disable max-len */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const functions = require("firebase-functions");
const cors = require("cors")({origin: true});
const admin = require("firebase-admin");
admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;
      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});
exports.addCapitalizeBook = onRequest((req, res) => {
  cors(req, res, async () => {
    const {isbn, name} = req.body;

    try {
      const isbnNumber = Number(isbn);
      if (isNaN(isbnNumber)) {
        return res.status(400).send("ISBN must be a valid number.");
      }

      const booksCollection = admin.firestore().collection("books");
      const dupCheck = await booksCollection.where("isbn", "==", isbnNumber).get();

      if (!dupCheck.empty) {
        return res.status(409).send("ISBN already exists in the database.");
      }

      const capitalizedName = name.toUpperCase();

      await booksCollection.add({isbn: isbnNumber, name: capitalizedName});

      return res
          .status(201)
          .send({message: "Book added successfully!", isbn: isbnNumber, name: capitalizedName});
    } catch (error) {
      console.error("Error adding book:", error);
      return res.status(500).send("Error adding book");
    }
  });
});
exports.getAllBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();

      // Map over each document in the collection to get the book data
      const books = snapshot.docs.map((doc) => doc.data());

      return res.status(200).send({books});
    } catch (error) {
      console.error("Error getting all books:", error.message);
      res.status(500).send("Error getting all books");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
