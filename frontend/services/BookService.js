class BookService{
     constructor(){
          this.URI = 'http://localhost:3000/api/books'
     }

     async getBooks(){
          const response = await fetch(this.URI);
          const books = await response.json();
          return books;
     }

     async postBook(book){
          const response = await fetch(this.URI,{
               method:'post',
               body:book
          });
          const data = await response.json();
          console.log(data);
     }

     async deleteBook(bookId){
          const response = await fetch(`${this.URI}/${bookId}`,{
               headers:{
                    'Content-Type':'application/json'
               },
               method:'delete'
          });
          const data = await response.json();
          console.log(data);
     }
}

export default BookService;