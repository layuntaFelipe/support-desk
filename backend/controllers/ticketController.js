const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const { reset } = require('nodemon');

// @desc    Get user tickets
// @route   GET /api/tickets/all
// @access  Private
const getAllTickets = asyncHandler( async (req, res) => {
    // Get user using the id and the jwt
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401);
        throw Error('User not found');
    }

    if(!user.isAdmin) {
        res.status(401);
        throw Error('User not admin');
    }

    const tickets = await Ticket.find();

    res.status(200).json(tickets);
});

// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = asyncHandler( async (req, res) => {
 // Get user using the id and the jwt
 const user = await User.findById(req.user.id);

 if(!user) {
  res.status(401);
  throw Error('User not found');
 }

 const tickets = await Ticket.find({user: req.user.id})

 res.status(200).json(tickets);
});

// @desc    Get user single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler( async (req, res) => {
 // Get user using the id and the jwt
 const user = await User.findById(req.user.id);

 if(!user) {
  res.status(401);
  throw Error('User not found');
 }

 const ticket = await Ticket.findById(req.params.id);

 if(!ticket){
  res.status(401);
  throw Error('Ticket not found');
 }

 if((req.user.isAdmin) || (ticket.user.toString() == req.user.id)){
    res.status(200).json(ticket);
 }else {
    res.status(401);
    throw Error('Not Authorized');
 }

//  if((ticket.user.toString() !== req.user.id)){
//   res.status(401);
//   throw Error('Not Authorized');
//  }

    // res.status(200).json(ticket);
});

// @desc    Create a new ticket
// @route   POST /api/tickets
// @access  Private
const createTickets = asyncHandler( async (req, res) => {
 const {product, description} = req.body;

 if(!product || !description) {
  res.status(400);
  throw Error('Please add a product and description');
 }

  // Get user using the id and the jwt
  const user = await User.findById(req.user.id);

  const ticket = await Ticket.create({
   user: req.user.id,
   product,
   description,
   status: 'new'
  })

 res.status(201).json(ticket);
});

// @desc    Delete user single ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler( async (req, res) => {
 // Get user using the id and the jwt
 const user = await User.findById(req.user.id);

 if(!user) {
  res.status(401);
  throw Error('User not found');
 }

 const ticket = await Ticket.findById(req.params.id);

 if(!ticket){
  res.status(401);
  throw Error('Ticket not found');
 }

 if((req.user.isAdmin) || (ticket.user.toString() == req.user.id)){
    await ticket.remove();
    res.status(200).json({success: true});
 }else {
    res.status(401);
    throw Error('Not Authorized');
 }
});

// @desc    Delete user single ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler( async (req, res) => {
 // Get user using the id and the jwt
 const user = await User.findById(req.user.id);

 if(!user) {
  res.status(401);
  throw Error('User not found');
 }

 const ticket = await Ticket.findById(req.params.id);

 if(!ticket){
  res.status(401);
  throw Error('Ticket not found');
 }

 if((req.user.isAdmin) || (ticket.user.toString() == req.user.id)){
    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTicket);
 }else {
    res.status(401);
    throw Error('Not Authorized');
 }
});

module.exports = {
 getTickets,
 createTickets,
 getTicket,
 getAllTickets,
 deleteTicket,
 updateTicket
}