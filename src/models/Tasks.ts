import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "New Task"
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Completed"],
        default: "To Do"
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    dueDate: {
        type: Date,
    },
    userId: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    })

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);