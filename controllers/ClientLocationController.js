const User = require("../models/User");
const ClientLocation = require("../models/ClientLocation");

const getClientLocationById = async (req, res) => {
  await User.find({id_owner:String(req.body.id_owner)})
  .populate("client_location")
  .then(p=>  res.json(p));
};
const getClientInfoById = async (req, res) => {
  console.log(req.body._id)

  await User.find({_id:String(req.body._id)})
  .populate("client_location")
  .then(p=>  res.json(p));
};

const postClientLocation = (req, res) => {
    try {
     const clientLocation = new ClientLocation({
        sucursalName: req.body.sucursalName,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        iconType: req.body.iconType,
        logoColor: req.body.logoColor,
        active: req.body.active,
        client_id:req.body.client_id,
        id_owner:req.body.id_owner,
      });
      clientLocation.save((err,location) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
            sucursalName:location.sucursalName,
            longitud: location.longitud,
            latitud: location.latitud,
            iconType:location.iconType,
            logoColor:location.logoColor,
            active:location.active,
            client_id:location.client_id,
            id_owner:location.id_owner
        });
      });
    } catch (e) {
      myConsole.log(e);
    }
  };

module.exports = {
  getClientLocationById,postClientLocation,getClientInfoById
};
