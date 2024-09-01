import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

//Levantamos el servidor expres
const app = express()
app.use(express.json())

const allowedOrigins = ['http://localhost:3000'];  // Aquí especificas los orígenes permitidos

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Limitamos las peticiones a nuestro servidor
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);


//Conexión a nuestra base de datos local
mongoose.connect('mongodb://mongodb:27017/challenge').then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

//Prueba de funcionamiento de la api
app.get('/', (_req, _res) => {
    _res.send('OK')
})
// Rutas de usuario
app.use('/api/users', userRoutes);

app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on port 5000');
});

export default app;