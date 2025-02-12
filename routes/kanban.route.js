const expres = require("express");
const router = expres.Router();

const {verificarAuth} = require("../middlewares/authentication.js");
const kanbanController = require("../controllers/KanbanController");

router
.post("/kanban/list/id", kanbanController.getListOfKanban)
.post("/kanban/kanbanId", kanbanController.postKanbanByKanbanId)
.post("/kanban/task/kanbanId", kanbanController.postKanbanByKanbanTasksId)
.post("/kanban/user/id", kanbanController.findIdKanban)
.post("/kanban/client/id", kanbanController.findListOfClientsIdKanban)
.post("/kanban/create/id", kanbanController.postKanban)
.post("/kanban/id", kanbanController.findIdKanbanByClientTasks)
.post("/kanban/task/id", kanbanController.findIdKanbanByClient)
.put("/kanban/id", kanbanController.updateKanban)
.put("/kanban/client", kanbanController.updateKanban)
.delete("/kanban/id", kanbanController.deleteMessageOrClientFromKanban);

module.exports = router;