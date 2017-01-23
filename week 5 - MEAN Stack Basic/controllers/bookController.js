var Book = require('../models/book');

exports.getBookList= function(req, res) {
    Book.find()
        .sort({'publishedDate': -1})
        .limit(16)
        .exec(function (err,data) {
        if(err)
            res.json(err);
            else {
            res.json({books: data, title: 'Login'});
        }
    });
};


exports.saveNewBook=function  (req,res) {
    var formData=req.body;
    var newBook=new Book({
        title:formData.title,
        isbn:formData.isbn,
        pageCount:formData.pageCount,
        publishedDate:formData.publishedDate,
        thumbnailUrl:"http://placehold.it/800x500",
        shortDescription: formData.shortDescription,
        longDescription:formData.longDescription,
        //status:formData.status,
        authors:formData.authors,
        categories:formData.categories
    });
    newBook.save(function (err,result) {
        if(err){
            res.json(err);
        }
        res.json(result);
    });

};

exports.getBookDetails=function(req, res) {
    Book.findById(req.params.id, function (err, data) {
        if (!err) {
            res.json({ title: "book details",book: data})
        } else {
            console.log(err);
            res.status(500);
            res.json({ error: err })
        }
    });
};