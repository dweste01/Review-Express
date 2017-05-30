const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser')

let sessionStorage = {};
let latestId = 0;

router.use(cookieParser())

router.get('/', (req, res, next) => {
	console.log(req.cookies);
	if (!req.cookies.seshId) {
		// new visister - doesn't have a session ID yet
		latestId++;
		res.set({
			'Set-Cookie': 'seshId=' + latestId
		})

		sessionStorage[latestId] = {
			number: 0
		}

	} else {
		// has visisted before
		sessionStorage[latestId].number++;
	}
	// console.log(sessionStorage);
	// console.log(latestId)
	res.send(sessionStorage[latestId])
})


module.exports = router;