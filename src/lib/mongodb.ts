import mongoose from "mongoose"

let isConnected = false // to track connection

export async function connectDB() {
    if (isConnected) return

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "TaskManager",
        })
        isConnected = true
        console.log("✅ MongoDB Connected:", conn.connection.host)
    } catch (error) {
        console.error("❌ MongoDB Error:", error)
    }
}
