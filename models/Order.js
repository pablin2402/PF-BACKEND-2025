const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
  order_id: { type: String, require: true },
  orderName: { type: String, require: true },
  receiveNumber:{ type: String, require: true },
  creationDate: { type: Date, default: Date.now },
  noteAditional: { type: String, require: true },
  userId: { type: String, require: true },
  id_owner: { type: String, require: true },
  products: { type : Array , "default" : [] },
  dissccount: { type: Number, require: true },
  tax: { type: Number, require: true },
  totalAmount: { type: Number, require: true },
  nit: { type: Number, require: true },
  razonSocial: { type: String, require: true },
  cellphone: { type: Number, require: true },
  direction: { type: String, require: true },
  zona: { type: String, require: true },
  city: { type: String, require: true },
  accountStatus: { type: String, require: true },
  dueDate: { type: Date},
  clientName: { type: String, require: true },
  earnMoney: { type: Number, require: true },
  id_client: { type: String, require: true },
});

module.exports = mongoose.model("Order", orderSchema);
  