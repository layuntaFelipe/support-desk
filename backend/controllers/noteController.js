const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler( async (req, res) => {
 // Get user using the id and the jwt
 const user = await User.findById(req.user.id);

 if(!user) {
  res.status(401);
  throw Error('User not found');
 }

 const ticket = await Ticket.findById(req.params.ticketId);

 if((req.user.isAdmin) || (ticket.user.toString() == req.user.id)){
    const notes = await Note.find({ ticket: req.params.ticketId })
    res.status(200).json(notes);
  }else {
    res.status(401);
    throw new Error('User not authorized');
  }

});

// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler( async (req, res) => {
 // Get user using the id and the jwt
 const user = await User.findById(req.user.id);

 if(!user) {
  res.status(401);
  throw Error('User not found');
 }

 const ticket = await Ticket.findById(req.params.ticketId);

 
 if((req.user.isAdmin) || (ticket.user.toString() == req.user.id)){
    const note = await Note.create({ 
      text: req.body.text,
      isStaff: false,
      ticket: req.params.ticketId ,
      user: req.user.id
    })
  
    res.status(200).json(note);
  }else {
    res.status(401);
    throw new Error('User not authorized');
  }
});

module.exports = {
  getNotes,
  addNote
}