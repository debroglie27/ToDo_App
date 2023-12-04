let express = require('express')
let todoController = require('./controllers/todoController');

let app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Listening at port ${port}`);
});