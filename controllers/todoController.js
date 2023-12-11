let bodyParser = require('body-parser');
let mongoose = require('mongoose');

const usernameDB = 'arijeetde';
const passwordDB = 'tododb';
const nameDB = 'todo';

// MongoDB Connection URL
const mongoDBConnURI = `mongodb+srv://${usernameDB}:${passwordDB}@todo.nnscqhu.mongodb.net/${nameDB}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoDBConnURI);

// Create Schema
let todoSchema = new mongoose.Schema({
    item: String
});

// Creating Collection
let todoModel = mongoose.model('todos', todoSchema);

// let data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
let urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    app.get('/todo', async (req, res) => {
        // Get data from MongoDB and pass it to view
        const todoData = await todoModel.find({}).exec();
        res.render('todo', {todos: todoData});
    });

    app.post('/todo', urlencodedParser, async (req, res) => {
        // Get data from view and add it to MongoDB
        const newTodo = todoModel(req.body);
        await newTodo.save();
        res.json(req.body);
    });

    app.delete('/todo/:item', async (req, res) => {
        const deleteStatus = await todoModel.deleteOne({item: req.params.item.replace(/\-/g, " ")});
        res.json(deleteStatus);
    });
}