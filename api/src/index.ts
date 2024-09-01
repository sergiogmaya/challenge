import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user';

const app = express()
app.use(express.json())

app.get('/', (_req, _res) => {
    _res.send('OK')
})

mongoose.connect('mongodb://mongodb:27017/challenge').then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Rutas de usuario
app.use('/api/users', userRoutes);

export default app;