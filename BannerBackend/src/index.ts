import express from "express";
import cors from "cors";
import 'dotenv/config';
import v1 from "./routes/v1";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Body Parsing Middleware
app.use(express.json());

app.use('/api/v1', v1);

app.listen(PORT, () => {
    console.log(`Backend started at port ${PORT}`);
});
