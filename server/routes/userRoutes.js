import Router from "express"
import { login, register, setAvatar } from "../controller/userController.js"


const router = Router()

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar)

export default router
