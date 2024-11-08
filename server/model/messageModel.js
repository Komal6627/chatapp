import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   message :{
    text: {
        type: String,
        required: true,
    },
    users: Array,
    sender : {
        typeof: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
   }
},
   {
    timestamps : true
   }

);

 
export default mongoose.model("Messages", messageSchema);