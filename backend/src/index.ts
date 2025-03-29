import express from "express";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
// import userRoutes from "./routes/user.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from './middleware/errorMiddleware.js';
import cors from 'cors';




dotenv.config();
const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser()); 
app.use(express.json());
app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);
// Ensure errorHandler is used as an error-handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
