const express = require('express');
const router = express.Router();
const Books = require('../models/book');
const Chapters = require('../models/chapter');

// get all
router.get('/', (req, res, next) => {
	if (req.query.title) {
		return Books.findAll({where: {title: req.query.title}})
		.then(book => res.send(book))
		.catch(next);
	} else {
		return Books.findAll()
		.then(books => res.send(books))
		.catch(next);
	}
	
})

// post one
router.post('/', (req, res, next) => {
	return Books.create({
		title: req.body.title
	}).then ( newBook => {
		return newBook.setAuthor(req.body.authorId)
	}).then( bookWithAuthor => {
		res.status(201).json(bookWithAuthor)
	})
	.catch(next)
})

// get one
router.get('/:bookid', (req, res, next) => {

		return Books.findById(req.params.bookid)
		.then(book => {
			if (!book) {
				res.sendStatus(404);
			}
			else res.json(book)
		}).catch(next);
	// }

})

// put one
router.put('/:bookid', (req, res, next) => {
	return Books.findById(req.params.bookid)
			.then(book => {
				if (!book) res.sendStatus(404);
				else return book.update({ title: req.body.title })
			}).then(updatedBook => {
				 res.json(updatedBook)
			}).catch(next);
})

// delete one
router.delete('/:bookid', (req, res, next) => {
	return Books.findById(req.params.bookid)
			.then(book => {
				if (!book) res.sendStatus(404);
				else return book.destroy()
							.then(destroyedBook => {
								res.sendStatus(204);
							})
			}).catch(next);
})

// get all chapters for a book
router.get('/:bookid/chapters', (req, res, next) => {
	return Books.findById(req.params.bookid)
			.then(book => {
				if (!book) res.sendStatus(404);
				else return book.getChapters();
			}).then(chaps => { res.json(chaps) })
			.catch(next);
})


// post a chapter to a book
router.post('/:bookid/chapters', (req, res, next) => {
	return Books.findById(req.params.bookid)
			.then(book => {
				return Chapters.create({
					title: req.body.title,
					text: req.body.text,
					number: req.body.number
				}).then(newChap => {
					return newChap.setBook(book)
							.then(b => {
								res.status(201).json(b);
							}).catch();
				})
			}).catch(next);
})


// get a chapter in a book
router.get('/:bookid/chapters/:chapid', (req, res, next) => {
		return Books.findById(req.params.bookid)
			.then( book => {
				return book.getChapters({where:
					{ id: req.params.chapid }
				})
			}).then( c => {
					if (c.length) res.send(c[0]);
					else res.sendStatus(404);
			}).catch(next)
})

router.put('/:bookid/chapters/:chapid', (req, res, next) => {
	return Books.findById(req.params.bookid)
			.then( book => {
				book.getChapters({where: { id: req.params.chapid } })
			.then( c => {
				if (!c.length) res.sendStatus(404);
				else {
					return c[0].update({
					title: req.body.title
				})
				}
			}).then(updated => {
				res.json(updated);
			}).catch(next);
		})
})


router.delete('/:bookid/chapters/:chapid', (req, res, next) => {
	return Books.findById(req.params.bookid)
			.then( book => {
				book.getChapters({where: { id: req.params.chapid } })
			.then( c => {
				if (!c.length) res.sendStatus(404);
				else {c[0].destroy()
					.then(destroyed => {res.status(204).json(destroyed)})
					.catch(next)
				}
			}).catch(next);
		})
})

module.exports = router;















