import { Router } from "express"
import * as BruxoController from './../controller/bruxoController.js'

const router = Router();

router.get("/", BruxoController.listAll);

export default router;