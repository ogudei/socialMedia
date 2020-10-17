const Book = mongoose.model('Book', Schema({
    title: String,
    author: {
      type: mongoose.ObjectId,
      ref: 'Author'
    }
  }));
  const Author = mongoose.model('Author', Schema({
    name: String
  }));
  
  // Create books and authors
  const [author1, author2] = await Author.create([
    { name: 'Michael Crichton' },
    { name: 'Ian Fleming' }
  ]);
  const books = await Book.create([
    { title: 'Jurassic Park', author: author1._id },
    { title: 'Casino Royale', author: author2._id }
  ]);
  
  // Populate books and filter by author name.
  const books = Book.find().populate({
    path: 'author',
    match: { name: 'Ian Fleming' }
  });
  
  books.length; // 2
  books[0].author; // null
  books[1].author; // { name: 'Ian Fleming' }