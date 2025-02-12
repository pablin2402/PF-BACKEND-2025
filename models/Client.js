const mongoose = require("mongoose");
const { Schema } = mongoose;

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}
const userSchema = new Schema({
    fullName:   { type: String, require: true },
    lastName:   { type: String, require: true },
    email: { type: String, unique: true, require: true },
    phoneNumber:{ type: Number, unique: true, require: true },
    password: { type: String, require:true},
    creationDate: { type: Date, default: Date.now },
    role: { type: String, default: 'USER', enum: roles },
    active: { type: Boolean, default: true },
    id_saler: { type: Schema.ObjectId, ref: "SalesMan" },
    id_owner: { type: String, require: true },
});

module.exports = mongoose.model("Client", userSchema);
