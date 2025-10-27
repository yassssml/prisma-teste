import { Router } from "express"
import * as BruxoController from './../controller/bruxoController.js'

const router = Router();

router.get("/", BruxoController.listAll);
router.get("/:id", BruxoController.listOne);
router.post("/", BruxoController.create);
router.delete("/:id", BruxoController.deletar);
router.put("/:id", BruxoController.update);

export default router;