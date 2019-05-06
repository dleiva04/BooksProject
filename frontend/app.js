import './styles/app.css';

import UI from './UI';
const ui = new UI();

document.addEventListener('DOMContentLoaded',()=>{
     ui.renderBooks();
});

document.getElementById('book-form').addEventListener('submit',e =>{
     e.preventDefault();
     const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const isbn = document.getElementById('isbn').value;
     const image = document.getElementById('image').files;

     const formdata = new FormData();
     formdata.append('image',image[0]);
     formdata.append('title',title);
     formdata.append('author',author);
     formdata.append('isbn',isbn);
     ui.addNewBook(formdata);
     ui.renderMessage('Libro agregado','success',2000);
});

document.getElementById('books-cards').addEventListener('click',e=>{
     e.preventDefault();
     if(e.target.classList.contains('delete')){
          ui.deleteBook(e.target.getAttribute('_id'));
     }
     ui.renderMessage('Libro eliminado','danger',2000);
});