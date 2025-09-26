import request from 'supertest';
import { app } from '@/app.bootstrap';
import { GamificationController } from '@/modules/gamification/gamification.controller';
import { GamificationService } from '@/modules/gamification/gamification.service';
import { initializeDatabase } from '@/database';
import { runSeed } from '@/seed';
import JWT from 'jsonwebtoken';
import { SETTINGS } from '@/configs';

describe('GamificationController', () => {
  let gamificationController: GamificationController;
  let gamificationService: GamificationService;
  let authToken: string;

  beforeAll(async () => {
    await initializeDatabase();
    await runSeed();
    gamificationController = new GamificationController();
    gamificationService = gamificationController.gamificationService;

    authToken = JWT.sign(
      { user: { id: 1, email: 'student@example.com', userRoleId: 2, roleName: 'Student' } },
      SETTINGS.APP_JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/gamification/leaderboard', () => {
    it('should get leaderboard', async () => {
      const response = await request(app)
        .get('/api/gamification/leaderboard')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .get('/api/gamification/leaderboard');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/gamification/me', () => {
    it('should get my gamification data', async () => {
      const response = await request(app)
        .get('/api/gamification/me')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 401 without authentication', async () => {
      const response = await request(app)
        .get('/api/gamification/me');

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/gamification/badges/award', () => {
    it('should award badge to user', async () => {
      const badgeData = {
        userId: 1,
        badgeName: 'First Simulation',
        badgeData: { activityId: 1 }
      };

      const response = await request(app)
        .post('/api/gamification/badges/award')
        .set('Authorization', `Bearer ${authToken}`)
        .send(badgeData);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 401 without authentication', async () => {
      const badgeData = {
        userId: 1,
        badgeName: 'First Simulation'
      };

      const response = await request(app)
        .post('/api/gamification/badges/award')
        .send(badgeData);

      expect(response.status).toBe(401);
    });

    it('should return 422 for invalid data', async () => {
      const badgeData = {
        userId: 'invalid',
        badgeName: ''
      };

      const response = await request(app)
        .post('/api/gamification/badges/award')
        .set('Authorization', `Bearer ${authToken}`)
        .send(badgeData);

      expect(response.status).toBe(422);
    });
  });

  describe('GamificationController methods', () => {
    it('should have required methods', () => {
      expect(typeof gamificationController.getLeaderboard).toBe('function');
      expect(typeof gamificationController.getMyGamification).toBe('function');
      expect(typeof gamificationController.awardBadge).toBe('function');
    });

    it('should have gamificationService instance', () => {
      expect(gamificationService).toBeInstanceOf(GamificationService);
    });
  });
});
