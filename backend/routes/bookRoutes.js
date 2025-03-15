const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", getBooks); // Get all books
router.get("/:id", getBookById); // Get a book by ID
router.post("/", createBook); // Create a new book
router.put("/:id", updateBook); // Update a book by ID
router.delete("/:id", deleteBook); // Delete a book by ID

module.exports = router;
