import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import userRoutes from "./routes/userRoutes.js";
import addressRoutes from "./routes/addressSectionRoutes.js";
import addRoutes from "./routes/addRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
dotenv.config();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", addressRoutes);
app.use("/api", addRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
// connect the moongoose database
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "FoodDelivery",
  })
  .then(() => console.log("MongoDB is connect successfully 🎉"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

// Home route
app.use("/", (req, res) => {
  res.json({ message: "This is home route " });
});
// Server port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
