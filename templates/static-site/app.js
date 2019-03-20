//Dependencies
const express = require('express');
const pug = require('pug');
const app = express();
const path = require('path')
const port = (process.env.PORT || 3000);

require('dotenv').config();

//Middleware
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

//HTTPS Redirect if possible
if (process.env.NODE_ENV !== 'development') {
	app.get('*', function(req,res,next) {
	  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production')
	    res.redirect('https://'+req.hostname+req.url)
	  else
	    next() /* Continue to other routes if we're not redirecting */
	});
}

app.get('/', (req, res) => res.render('index', {page: 'index'}));
app.listen(port, () => console.log(`Listening on port ${port}!`))