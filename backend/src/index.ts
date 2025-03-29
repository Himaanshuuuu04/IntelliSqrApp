import express from "express";
import authRoutes from "./routes/auth.route.js";
// import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api/auth',authRoutes);

// app.use(express.urlencoded({ extended: true }));
// app.use('/api/user',userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
