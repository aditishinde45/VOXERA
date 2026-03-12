// models/meeting.model.js
import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    meetingcode: {
        type: String,
        required: true
    },
    createdAt: {  // Changed from 'data' to 'createdAt' for clarity
        type: Date,
        default: Date.now
    }
});

// Fix: Remove the space from the model name
const Meeting = mongoose.model("Meeting", meetingSchema);

export { Meeting };