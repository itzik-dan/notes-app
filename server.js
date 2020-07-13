const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const path = require('path')

const app = express()

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())

//DB Config
const db =require('./config/keys').mongoURI

//coonnect to Mongo
mongoose.connect(db, {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true })
		.then(() => console.log('MongoDB Connected...'))
		.catch(err => console.log(err))

const notesRouter = require('./routes/notes');

app.use('/notes', notesRouter);

//Serve static assests if in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 5000;

app.listen(port, () =>console.log(`app is running on port ${port}`));