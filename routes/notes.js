const router = require('express').Router();
let Note = require('../models/note');

//defining the route in order to fetch all the tasks
router.get('/', (req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => res.status(400).json('Error: ' + err));
});

//defining the route in order to create new task
router.post('/add', (req, res) => {
  const username = req.body.username;
  const content = req.body.content;
  const date = req.body.date;

  const newNote = new Note({
    username,
    content,
    date
  });

  newNote.save()
  .then(() => res.json('Note added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//defining the route in order to delete a task
router.delete('/:id', (req, res) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => res.json('Note deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;