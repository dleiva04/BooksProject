import BookService from './services/BookService';
import {format} from 'timeago.js';

const bookservice = new BookService();

class UI{
     async renderBooks(){
          const books = await bookservice.getBooks();
          const booksContainer = document.getElementById('books-cards');
          booksContainer.innerHTML = '';
          for (const book of books) {
               const div = document.createElement('div');
               div.className = '';
               div.innerHTML = `
                    <div class='card m-2'>
                         <div class='row'>
                              <div class='col-md-8'>
                                   <img src='http://localhost:3000${book.imagePath}' class='image-fluid'>
                              </div>
                              <div class='col-md-4'>
                                   <div class='card-block px-2'>
                                        <h4 class='card-title'>${book.title}</h4>
                                        <p class='card-body'>${book.author}</p>
                                        <a href='#' class='btn btn-danger delete' _id='${book._id}'>X</a>
                                   </div>
                              </div>
                         </div>
                         <div class='card-footer'>
                              ${format(book.createdAt)}
                         </div>
                    </div>
               `;
               booksContainer.appendChild(div);
          }
     }

     async addNewBook(book){
          await bookservice.postBook(book);
          this.clearBookForm();
          this.renderBooks();
     }

     clearBookForm(){
          document.getElementById('book-form').reset();
     }

     renderMessage(message,color,secsToRemove){
          const container = document.getElementById('renderMessages');
          container.innerHTML = `
               <div class="alert alert-${color} message" role="alert">
                    ${message}
               </div>
          `;
          setTimeout(() => {
               document.querySelector('.message').remove();
          }, secsToRemove);
     }

     async deleteBook(bookId){
          await bookservice.deleteBook(bookId);
          this.renderBooks();
     }
}

export default UI;