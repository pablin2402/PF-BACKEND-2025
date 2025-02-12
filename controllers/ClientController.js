const Client = require("../models/Client");
const User = require("../models/User");
const Message = require("../models/Message");

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const postNewAccount = (req, res) => {
  try {
   const client = new Client({
        fullName: req.body.fullName,
        lastName:req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds),
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
const JWT_SECRET = "secret";

const loginUser = (req, res) => {
  const { email, password } = req.body;
    const user = User.findOne({ email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h"});
      res.send({ message: 'Login successful', user, token });
    }
    if (!bcrypt.compareSync(password, user.password)) {
          return res.status(401).send({ message: 'Invalid email or password' });
    }
    if (password !== user.password) {
      return res.status(401).send({ message: 'Incorrect password' });
    }
};

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
}
const getUser = async (req, res) =>{
    try {
        const usuarioDB = await Client.findOne({email: req.body.email});
    
        if(!usuarioDB){
          return res.status(400).json({
            mensaje: 'Usuario! o contraseña inválidos',
          });
        }
        if( !bcrypt.compareSync(req.body.password, usuarioDB.password) ){
          return res.status(400).json({
            mensaje: 'Usuario o contraseña! inválidos',
          });
        }
        let token = jwt.sign({
            data: usuarioDB
          }, 'secret', { expiresIn: 60 * 60 * 24 * 30});

        return res.json({
          usuarioDB,
          token: token
        })
        
      } catch (error) {
        return res.status(400).json({
          mensaje: 'Ocurrio un error',
          error
        });
      }
};
const getClients = async (req, res) => {
  try {
    const { id_owner } = req.body;
    let { page = 1, limit = 10 } = req.query; // Recibe los parámetros de paginación

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit; 

    const clientList = await User.find({ id_owner: String(id_owner), status: "SHOW" })
      .populate("chat")
      .populate("sales_id")
      .skip(skip)
      .limit(limit);

    const totalClients = await User.countDocuments({ id_owner: String(id_owner), status: "SHOW" });
    console.log(clientList)
    res.json({
      clients: clientList,
      totalPages: Math.ceil(totalClients / limit), 
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error });
  }
};

const getClientsArchived = async (req, res) => {
  const clientList = await User.find({id_owner:String(req.body.id_owner),status:"ARCHIVED"}).populate("chat");
  res.json(clientList);
};
const getClientInfoById = async (req, res) => {
  const clientList = await User.find({id_user:String(req.body.id_user)});
  res.json(clientList);
};
const updateUserFile = async (req, res) => {
  const { id_user, name, lastName, number, company, email, directionId  } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id_user },
      { 
        name: name,
        lastName: lastName,
        number: number,
        company: company,
        email: email,
        directionId: directionId        
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User status updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user status', error });
  }
};
const postClient = (req, res) => { 
  try {
   const clients = new User({
      name: req.body.name,
      lastName: req.body.lastName,
      profilePicture: req.body.profilePicture,
      icon: req.body.icon, 
      directionId: req.body.directionId,
      number: req.body.number, 
      company: req.body.company,
      email: req.body.email,
      socialNetwork: req.body.socialNetwork,
      notes: req.body.notes,
      id_user: req.body.id_user,
      id_owner: req.body.id_owner,
      status: "SHOW",
      identityNumber: req.body.identityNumber,
      chat: req.body.chat
    });
    clients.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send({ message: "User was registered successfully!" });
    });
  } catch (e) {
    myConsole.log(e);
  }
};
const updateUserStatus = async (req, res) => {
  const { id_user, status } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { id_user },
      { status: status },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User status updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user status', error });
  }
};
const getMessagesById = async (req, res) => {
  const clientList = await Message.find({id_message:String(req.body.id_message)});
  res.json(clientList);
};
const deleteClient = async (req, res) => {
  const userId = req.body.id_user;
  const deleteProduct = await User.deleteOne({ id_user: userId });

  if (deleteProduct.deletedCount === 0) {
    return res.status(404).json({ error: 'Cliente no encontrado' });
  }
  return res.status(200).json({ message: 'Cliente eliminado correctamente' });
};
module.exports = {
  postNewAccount, auth,getUser, loginUser,getClients, getClientsArchived,getMessagesById, getClientInfoById, postClient, updateUserFile,updateUserStatus, deleteClient
};
