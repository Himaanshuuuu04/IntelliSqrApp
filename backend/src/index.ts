import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
// import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from './middleware/errorMiddleware.js';


dotenv.config();
const app = express();
app.use(cookieParser()); 
app.use(express.json());



// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
// Ensure errorHandler is used as an error-handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

// app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
