import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        },

        expiresAt: {
            type: Date,
            required: true,
            index: {
                expires: 0,
            },
        },
    },
    {
        timestamps: true,
    }
);

const BlacklistToken = mongoose.model(
    "BlacklistToken",
    blacklistTokenSchema
);

export default BlacklistToken;