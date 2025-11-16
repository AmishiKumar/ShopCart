import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    title: { type: String, required: true },
    discount: { type: Number, required: true },
    description: String,
});

export default mongoose.model("Offer", offerSchema);
