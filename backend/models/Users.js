import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username: {type: String, required: [true, "Please add an username"], unique: true},
    email: {type: String, required: [true, "Please add an email"], unique: true},
    password: {type: String, require: [true, "Please add a password"],},
    profilePic: {type: String, default:""},
    isAdmin: {type: Boolean, default:false},
    savedShows: [{id: String, streamName: String, streamType: String, index: String}],
    timestamp: {type: String, default: Date.now(),},
});

export default mongoose.model("User", UsersSchema)