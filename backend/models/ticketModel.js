const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
  user: {
   type: mongoose.Schema.Types.ObjectId,
   require: true,
   ref: 'User'
  },
  product: {
   type: String,
   require: [true, "Please select a product"],
   enum: ['Iphone', 'Macbook Pro', 'IMac', 'Macbook Air', 'IPad', 'Eearbuds', 'Airpods', 'IPod'],
  },
  description: {
   type: String,
   require: [true, 'Please enter a description of the issue']
  },
  status: {
   type: String,
   require: true,
   enum: ['new', 'open', 'closed'],
   default: 'new'
  }
 },
 {
  timestamps: true,
 }
)

module.exports = mongoose.model('Ticket', ticketSchema);