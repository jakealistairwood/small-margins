const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware');

router.get('/', (req, res) => {
    res.render('items/admin');
})

module.exports = router;