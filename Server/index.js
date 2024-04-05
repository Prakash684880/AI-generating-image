import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import connectDb from './MongoDB/connectDb.js';
import postRoutes from './Routes/postRoutes.js';
import myRoutes from './Routes/myRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


app.use('/api/postRoutes',postRoutes);
app.use('/api/myRoutes',myRoutes);

app.get('/', async (req, res) => {
    res.send("hello user");
});

const startServer = async () => {
    try {
        await connectDb(process.env.MONGODB_URL);
        app.listen(8080, () => {
            console.log('Server is running on port http://localhost:8080');
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
