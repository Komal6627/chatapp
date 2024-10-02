import Router from "express"
import { getAllUser, login, register, setAvatar } from "../controller/userController.js"


const router = Router()

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUser);



export default router
