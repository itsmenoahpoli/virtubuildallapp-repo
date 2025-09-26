import request from 'supertest';
import { app } from '@/app.bootstrap';
import { AssessmentsController } from '@/modules/assessments/assessments.controller';
import { AssessmentsService } from '@/modules/assessments/assessments.service';
import { initializeDatabase } from '@/database';
import { runSeed } from '@/seed';
import JWT from 'jsonwebtoken';
import { SETTINGS } from '@/configs';

describe('AssessmentsController', () => {
  let assessmentsController: AssessmentsController;
  let assessmentsService: AssessmentsService;
  let authToken: string;
  let instructorToken: string;

  beforeAll(async () => {
    await initializeDatabase();
    await runSeed();
    assessmentsController = new AssessmentsController();
    assessmentsService = assessmentsController.assessmentsService;

    authToken = JWT.sign(
      { user: { id: 1, email: 'student@example.com', userRoleId: 2, roleName: 'Student' } },
      SETTINGS.APP_JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    instructorToken = JWT.sign(
      { user: { id: 2, email: 'instructor@example.com', userRoleId: 3, roleName: 'Instructor' } },
      SETTINGS.APP_JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/assessments/module/:moduleId', () => {
    it('should get assessment by module id', async () => {
      const moduleId = 1;

      const response = await request(app)
        .get(`/api/assessments/module/${moduleId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 401 without authentication', async () => {
      const moduleId = 1;

      const response = await request(app)
        .get(`/api/assessments/module/${moduleId}`);

      expect(response.status).toBe(401);
    });

    it('should return 422 for invalid moduleId format', async () => {
      const response = await request(app)
        .get('/api/assessments/module/invalid')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(422);
    });
  });

  describe('PUT /api/assessments/module/:moduleId', () => {
    it('should create new assessment', async () => {
      const moduleId = 1;
      const quizData = {
        title: 'PC Assembly Assessment',
        questions: [
          {
            id: 1,
            question: 'What is the purpose of a CPU?',
            type: 'multiple-choice',
            options: ['Processing', 'Storage', 'Display', 'Input'],
            correctAnswer: 0
          }
        ]
      };

      const response = await request(app)
        .put(`/api/assessments/module/${moduleId}`)
        .set('Authorization', `Bearer ${instructorToken}`)
        .send(quizData);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should update existing assessment', async () => {
      const moduleId = 1;
      const quizData = {
        title: 'Updated PC Assembly Assessment',
        questions: [
          {
            id: 1,
            question: 'What is the purpose of RAM?',
            type: 'multiple-choice',
            options: ['Processing', 'Storage', 'Display', 'Input'],
            correctAnswer: 1
          }
        ]
      };

      const response = await request(app)
        .put(`/api/assessments/module/${moduleId}`)
        .set('Authorization', `Bearer ${instructorToken}`)
        .send(quizData);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });

    it('should return 401 without authentication', async () => {
      const moduleId = 1;
      const quizData = {
        title: 'Test Assessment',
        questions: []
      };

      const response = await request(app)
        .put(`/api/assessments/module/${moduleId}`)
        .send(quizData);

      expect(response.status).toBe(401);
    });

    it('should return 422 for invalid moduleId format', async () => {
      const quizData = {
        title: 'Test Assessment',
        questions: []
      };

      const response = await request(app)
        .put('/api/assessments/module/invalid')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send(quizData);

      expect(response.status).toBe(422);
    });
  });

  describe('AssessmentsController methods', () => {
    it('should have all required methods', () => {
      expect(typeof assessmentsController.getByModuleHandler).toBe('function');
      expect(typeof assessmentsController.upsertHandler).toBe('function');
    });

    it('should have assessmentsService instance', () => {
      expect(assessmentsService).toBeInstanceOf(AssessmentsService);
    });
  });
});
