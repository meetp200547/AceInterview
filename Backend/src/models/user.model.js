import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [ true, "Username already taken" ],
        required: [ true, "Username is required" ],
    },

    email: {
        type: String,
        unique: [ true, "Account already exists with this email address" ],
        required: [true, "Email is required"],
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.model("users", userSchema);

export default userModel;