const res = require("express/lib/response");
const Book = require("./model");

const createOne = async (req, res) => {
  const bookToCreate = {
    ...req.body
  };

  const createABook = Book().createOneBook;
  const thisRes = await createABook(bookToCreate, res);
  return res.json({ data: thisRes });
}

const getAll = async (req, res) => {
  const all = Book().getAll;
  const thisRes = await all(res);
  return res.json({ data: thisRes });
}

const getOneById = async (req, res) => {
  const idToGet = req.params.id;

  const one = Book().getOneById;
  const thisRes = await one(idToGet);
  return res.json({ data: thisRes });
}

const getFictionBooks = async (req, res) => {
  //console.log("req.query:", req.query);
  const fiction = Book().getFictionBooks;
  const thisRes = await fiction(req.query.topic, res);
  return res.json({ data: thisRes });
}

const getNonFictionBooks = async (req, res) => {
  const nonFiction = Book().getNonFictionBooks;
  const thisRes = await nonFiction(req.query.topic, res);
  return res.json({ data: thisRes });
}

const getBooksByAuthor = async (req, res) => {
  const authorBooks = Book().getBooksByAuthor;
  const thisRes = await authorBooks(req.params.author, req.query.order, res);
  return res.json({ data: thisRes });
}

module.exports = {
  createOne,
  getAll,
  getOneById,
  getFictionBooks,
  getNonFictionBooks,
  getBooksByAuthor
}