const expres = require("express");
const router = expres.Router();
const whatsAppController = require("../controllers/WhatsappControllers");
const productController = require("../controllers/ProductController");
const categoryController = require("../controllers/CategoryController");
const carrouselController = require("../controllers/CarrouselController");
const quotationController = require("../controllers/QuotationController");
const priceController = require("../controllers/PriceController");
const userController = require("../controllers/ClientController");
const {verificarAuth} = require("../middlewares/authentication.js");
const orderController = require("../controllers/OrderController");
const gmailController = require("../controllers/GmailController");
const clientLocationController = require("../controllers/ClientLocationController");
const textController = require("../controllers/TextProcessController");
const TemplateController = require("../controllers/TemplateMessageController");
const clientController = require("../controllers/ClientInfoController");
const noteController = require("../controllers/NoteController");
const SalesHistorialController = require("../controllers/SalesHistorialController");
const supplierController = require("../controllers/SupplierController");
const automatizationController = require("../controllers/AutomatizationController");
const answerController = require("../controllers/AnswersController");
const ChatController = require("../controllers/ChatController");


router
.get("/", whatsAppController.VerifyToken)
.post("/", whatsAppController.ReceivedMessage)
.post("/message", whatsAppController.SendMessage)
.post("/product/list", whatsAppController.SendMessageTemplate)
.post("/messages/type/id", whatsAppController.updateTypeList)
.delete("/messages/id", whatsAppController.deleteMessage)


.post("/answer", answerController.postAnswer)
.post("/answer/id", answerController.getAnswerById)
.delete("/answer/id", answerController.deleteAnswer)

.post("/chat", ChatController.postChat)
.put("/chat/id", ChatController.updateChat)

.get("/messagesList", verificarAuth ,whatsAppController.getList)

.post("/automatization",automatizationController.getAutomatization)
.post("/automatization/new", automatizationController.postAutomatization)
.post("/automatization/list", automatizationController.postAutomatizationList)
.put("/automatization/list/id", automatizationController.uploadAutomatizationStatus)


.post("/product/id", productController.getProductsById)
.post("/product", productController.postProduct)
.post("/product/import", productController.postProductsMany)
.put("/product/id", productController.uploadProductStatus)
.delete("/product/id", productController.deleteProduct)


.post("/category/id", categoryController.getCategory)
.post("/category", categoryController.postCategory)
.post("/category/import", categoryController.postCategoryMany)
.get("/carrousel", carrouselController.getCarrousel)
.get("/quotation", quotationController.getQuotation)
.post("/quotation", quotationController.postQuotation)

.post("/price/product", priceController.getPriceByProductId)
.post("/price", priceController.postPrice)
.put("/price", priceController.uploadPriceProduct)

.post("/user", userController.postNewAccount)
.post("/login", userController.getUser)
.put("/user/id", userController.updateUserFile)
.delete("/user/id", userController.deleteClient)

.post("/order", orderController.postOrder)
.post("/order/id", orderController.getOrderById)
.post("/order/id/user", orderController.getOrderByIdAndClient)
.delete("/order/id", orderController.deleteOrder)

.get("/mail/user/:email",gmailController.getUser)
.get("/mail/message",gmailController.getDrafts)
.get("/mail/message/id",gmailController.getMessagesById)
.post("/mail/message/id",gmailController.deleteMessagesById)
.post("/mail/message/key",gmailController.findMessagesByKeyMessage)
.post("/mail",gmailController.sendMail)
.post("/mail/body/id",gmailController.getBodyMessage)

.post("/maps/list/id",clientLocationController.getClientLocationById)
.post("/maps/id",clientLocationController.postClientLocation)
.post("/client/info/id",clientLocationController.getClientInfoById)

.post("/text/id",textController.postTextProcess)
.post("/text/input",textController.addInputMessage)
.put("/text/id",textController.updateText)
.put("/text/children",textController.updateTextChildren)
.post("/text/input/children",textController.addInputMessageChildren)
.post("/text",textController.getListOfTextProcess)
.post("/text/children",textController.addNewChild)
.post("/text/grandchildren",textController.addNewGrandChild)
.put("/text",textController.removeInputMessage)
.put("/text/children/id",textController.removeInputMessageFromChildren)
.put("/text/child/id",textController.removeChild)
.post("/text/child/default",textController.getDefaultMessageFromDB)
.put("/image/child/id",textController.updateImageChildren)
.put("/status/template",textController.updateStatusTemplateTrue)
.put("/type/child/id",textController.updateTypeTextChildren)

.post("/template",TemplateController.postTemplate)
.post("/template/list",TemplateController.getListOfTextProcess)
.delete("/template/id",TemplateController.deleteTemplate)

.get("/note",noteController.getNote)
.post("/note",noteController.postNote)

.post("/sales/inform",SalesHistorialController.getSalesHistorial)
.post("/sales/inform/client",SalesHistorialController.getSalesHistorialPerClient)
.post("/sales",SalesHistorialController.postSalesHistorial)

.post("/client/info", clientController.postClientInfo)
.get("/directions", async (req, res) => {
    const { origin, destination, waypoints } = req.query;
    const apiKey = "AIzaSyBXVleyFRjK4-iRECoUkxGJgXdpzPbOgO8";
  
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener datos de la API" });
    }
  })
.post("/supplier/info", supplierController.postSupplier)
.post("/supplier", supplierController.getSupplier);

module.exports = router;