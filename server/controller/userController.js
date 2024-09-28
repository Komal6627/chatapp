import bcrypt from "bcrypt"
import User from "../model/userModel";

export const register = async(req, res, next) => {
    const { username, email, password } =req.body;
    const usernameCheck = await User.findOne({username});

    if(usernameCheck) {
        return res.json({msg: "Username  already used", status: false})
    }
}