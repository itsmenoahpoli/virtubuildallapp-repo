import { AssessmentsService } from '@/modules/assessments/assessments.service';
import { assessmentsRepository } from '@/database';

jest.mock('@/database');

describe('AssessmentsService', () => {
  let assessmentsService: AssessmentsService;
  let mockAssessmentsRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();
    assessmentsService = new AssessmentsService();
    mockAssessmentsRepository = assessmentsRepository as jest.Mocked<typeof assessmentsRepository>;
  });

  describe('getByModule', () => {
    it('should return assessment for a module', async () => {
      const mockAssessment = {
        id: 1,
        moduleId: 1,
        quiz: {
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
        },
        isEnabled: true
      };

      mockAssessmentsRepository.findOneBy.mockResolvedValue(mockAssessment as any);

      const result = await assessmentsService.getByModule(1);

      expect(result).toEqual(mockAssessment);
      expect(mockAssessmentsRepository.findOneBy).toHaveBeenCalledWith({ moduleId: 1 });
    });

    it('should return null for module with no assessment', async () => {
      mockAssessmentsRepository.findOneBy.mockResolvedValue(null);

      const result = await assessmentsService.getByModule(999);

      expect(result).toBeNull();
      expect(mockAssessmentsRepository.findOneBy).toHaveBeenCalledWith({ moduleId: 999 });
    });
  });

  describe('upsert', () => {
    it('should create new assessment when none exists', async () => {
      const mockQuiz = {
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

      const mockCreatedAssessment = {
        id: 1,
        moduleId: 1,
        quiz: mockQuiz,
        isEnabled: true
      };

      mockAssessmentsRepository.findOneBy
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockCreatedAssessment);
      mockAssessmentsRepository.create.mockReturnValue(mockCreatedAssessment as any);
      mockAssessmentsRepository.save.mockResolvedValue(mockCreatedAssessment as any);

      const result = await assessmentsService.upsert(1, mockQuiz);

      expect(result).toEqual(mockCreatedAssessment);
      expect(mockAssessmentsRepository.create).toHaveBeenCalledWith({
        moduleId: 1,
        quiz: mockQuiz,
        isEnabled: true
      });
      expect(mockAssessmentsRepository.save).toHaveBeenCalledWith(mockCreatedAssessment);
    });

    it('should update existing assessment', async () => {
      const existingAssessment = {
        id: 1,
        moduleId: 1,
        quiz: {
          title: 'Old Assessment',
          questions: []
        },
        isEnabled: true
      };

      const updatedQuiz = {
        title: 'Updated Assessment',
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

      const updatedAssessment = {
        ...existingAssessment,
        quiz: updatedQuiz
      };

      mockAssessmentsRepository.findOneBy
        .mockResolvedValueOnce(existingAssessment)
        .mockResolvedValueOnce(updatedAssessment);
      mockAssessmentsRepository.update.mockResolvedValue({ affected: 1 });

      const result = await assessmentsService.upsert(1, updatedQuiz);

      expect(result).toEqual(updatedAssessment);
      expect(mockAssessmentsRepository.update).toHaveBeenCalledWith(1, { quiz: updatedQuiz });
      expect(mockAssessmentsRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should handle complex quiz structure', async () => {
      const complexQuiz = {
        title: 'Advanced PC Assembly Assessment',
        description: 'Test knowledge of PC assembly',
        timeLimit: 30,
        questions: [
          {
            id: 1,
            question: 'Which component is responsible for processing?',
            type: 'multiple-choice',
            options: ['CPU', 'RAM', 'GPU', 'PSU'],
            correctAnswer: 0,
            points: 10
          },
          {
            id: 2,
            question: 'List the steps to install a CPU.',
            type: 'essay',
            correctAnswer: 'Open socket, align CPU, place CPU, lock socket',
            points: 20
          }
        ],
        passingScore: 70
      };

      const mockCreatedAssessment = {
        id: 1,
        moduleId: 1,
        quiz: complexQuiz,
        isEnabled: true
      };

      mockAssessmentsRepository.findOneBy
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockCreatedAssessment);
      mockAssessmentsRepository.create.mockReturnValue(mockCreatedAssessment as any);
      mockAssessmentsRepository.save.mockResolvedValue(mockCreatedAssessment as any);

      const result = await assessmentsService.upsert(1, complexQuiz);

      expect(result).toEqual(mockCreatedAssessment);
      expect(mockAssessmentsRepository.create).toHaveBeenCalledWith({
        moduleId: 1,
        quiz: complexQuiz,
        isEnabled: true
      });
    });

    it('should handle empty quiz data', async () => {
      const emptyQuiz = {};

      const mockCreatedAssessment = {
        id: 1,
        moduleId: 1,
        quiz: emptyQuiz,
        isEnabled: true
      };

      mockAssessmentsRepository.findOneBy
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(mockCreatedAssessment);
      mockAssessmentsRepository.create.mockReturnValue(mockCreatedAssessment as any);
      mockAssessmentsRepository.save.mockResolvedValue(mockCreatedAssessment as any);

      const result = await assessmentsService.upsert(1, emptyQuiz);

      expect(result).toEqual(mockCreatedAssessment);
      expect(mockAssessmentsRepository.create).toHaveBeenCalledWith({
        moduleId: 1,
        quiz: emptyQuiz,
        isEnabled: true
      });
    });
  });
});
