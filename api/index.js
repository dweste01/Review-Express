const express = require('express');
const router = express.Router();


// books, and books/chapters
router.use('/api/books', require('./books'));

// counts number of visits per client
router.use('/api/numVisits', require('./numVisits'))



module.exports = router;