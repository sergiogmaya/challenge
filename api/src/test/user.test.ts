import request from 'supertest';
import app from '../index';
import User from '../models/User';

const baseApi = '/api/users';

beforeAll(async () => {
  // Limpiamos la entidad User de la base de datos antes de usarla
  await User.deleteMany({});
});

//Aqui podemos limpiar la base de datos después de usar el test, yo lo estoy usando como un seeder asi que lo dejo comentado
/* afterEach(async () => {
  await User.deleteMany({});
}); */

describe('User API endpoints', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123' };

      const response = await request(app)
        .post(`${baseApi}/register`)
        .send(userData);

      expect(response.statusCode).toBe(201);
      expect(response.body.token).toBeDefined();
    });

    it('should not register a user with an existing email', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123' };
      await request(app).post(`${baseApi}/register`).send(userData); // Pre-register user

      const response = await request(app)
        .post(`${baseApi}/register`)
        .send(userData);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch(/already in use/);
    });
  });

  describe('POST /login', () => {
    it('should login the user and return a token', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123' };
      await request(app).post(`${baseApi}/register`).send(userData);

      const response = await request(app)
        .post(`${baseApi}/login`)
        .send({ email: userData.email, password: userData.password });

      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    it('should not login with incorrect credentials', async () => {
      const response = await request(app)
        .post(`${baseApi}/login`)
        .send({ email: 'test@example.com', password: 'wrongPassword' });

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch(/Invalid credentials/);
    });
  });

  describe('GET /me', () => {
    it('should return the user data for the logged-in user', async () => {
      const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123' };
      await request(app).post(`${baseApi}/register`).send(userData);
      const loginResponse = await request(app)
        .post(`${baseApi}/login`)
        .send({ email: userData.email, password: userData.password });
      const token = loginResponse.body.token;

      const response = await request(app)
        .get(`${baseApi}/me`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.email).toBe(userData.email);
      expect(response.body.username).toBe(userData.username);
    });

    it('should deny access without a token', async () => {
      const response = await request(app)
        .get(`${baseApi}/me`);

      expect(response.statusCode).toBe(401);
      expect(response.body.message).toMatch(/No token provided/);
    });
  });
});
