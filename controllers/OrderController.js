const Order = require("../models/Order");

const getOrderById = async (req, res) => {
  try {
    const { id_owner, page = 1, limit = 10 } = req.body;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const orderList = await Order.find({ id_owner })
      .skip(skip)
      .limit(limitNumber);

    const totalOrders = await Order.countDocuments({ id_owner }); 

    res.json({
      orders: orderList,
      totalPages: Math.ceil(totalOrders / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo órdenes", error });
  }
};

const getOrderByIdAndClient = async (req, res) => {
  const orderList = await Order.find({id_owner: req.body.id_owner, userId: req.body.userId});
  res.json(orderList);
};
const postOrder = (req, res) => {
  try {
    const order = new Order({
      order_id: req.body.order_id,
      orderName: req.body.orderName,
      receiveNumber: req.body.receiveNumber,
      noteAditional: req.body.noteAditional || "",
      userId: req.body.userId,
      id_owner: req.body.id_owner,
      products: req.body.products || [],
      dissccount: req.body.dissccount || 0,
      tax: req.body.tax || 0,
      totalAmount: req.body.totalAmount || 0,
      nit: req.body.nit || "",
      razonSocial: req.body.razonSocial || "",
      cellphone: req.body.cellphone || "",
      direction: req.body.direction || "",
      zona: "",
      city: "",
      clientName: req.body.clientName || "",
      accountStatus: req.body.accountStatus || "pending",
      dueDate: req.body.dueDate || null,
      earnMoney: req.body.earnMoney || 0,
      id_client: req.body.id_client || "",
    });

    order.save((err, savedOrder) => {
      if (err) {
        console.error("Error al guardar la orden:", err);
        return res.status(500).send({ message: "Error al guardar la orden." });
      }

      res.status(200).send(savedOrder);
    });
  } catch (e) {
    console.error("Error en el servidor:", e);
    res.status(500).send({ message: "Error en el servidor." });
  }
};

const deleteOrder = async (req, res) => {
  console.log(req.body.order_id)
  const order_id = req.body.order_id;
  const deleteProduct = await Order.deleteOne({ order_id: order_id });

  if (deleteProduct.deletedCount === 0) {
    return res.status(404).json({ error: 'Orden no encontrado' });
  }
  return res.status(200).json({ message: 'Orden eliminado correctamente' });
};

module.exports = {
    getOrderById,
    getOrderByIdAndClient,
    postOrder,
    deleteOrder
};
