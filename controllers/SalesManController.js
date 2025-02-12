const SalesMan = require("../models/SalesMan");

const postNewAccount = (req, res) => {
  try {
   const client = new SalesMan({
        fullName: req.body.fullName,
        lastName:req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        id_owner: req.body.id_owner,
        phoneNumber: req.body.phoneNumber
    });
    client.save((err,client) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.status(200, 204).send({
        fullName: client.fullName,
        lastName:client.lastName,
        email: client.email,
        role: client.role,
        id_owner: client.id_owner,
        phoneNumber: client.phoneNumber 
      });
    });
  } catch (e) {
    myConsole.log(e);
  }
};
const getSalesMan = async (req, res) => {
      await SalesMan.find({id_owner:String(req.body.id_owner)}).then(p=>  res.json(p));
};
const getClientLocationById = async (req, res) => {
    await SalesMan.find({id_owner:String(req.body.id_owner)}).populate("client_location").then(p=>  res.json(p));
  };
  
module.exports = {
    postNewAccount,
    getSalesMan,
    getClientLocationById
};
  