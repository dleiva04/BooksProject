const {Router} = require('express');
const fs = require('fs-extra');
const path = require('path');
const router = Router();

const Book = require('../models/Book');

router.get('/',async (req,res)=>{
     const books = await Book.find();
     res.json(books);
});  

router.post('/',async (req,res)=>{
     const {title,author,isbn} = req.body;
     const imagePath = '/uploads/'+req.file.filename;
     const newBook = new Book({title,author,isbn,imagePath});
     await newBook.save();
     res.json({message:'Libro guardado'});
});  

router.delete('/:id',async (req,res)=>{
     const book = await Book.findByIdAndDelete(req.params.id);
     fs.unlink(path.resolve(`./backend/public${book.imagePath}`))
     console.log(book);
     res.json({message:'Libro eliminado'});
});  

module.exports = router;