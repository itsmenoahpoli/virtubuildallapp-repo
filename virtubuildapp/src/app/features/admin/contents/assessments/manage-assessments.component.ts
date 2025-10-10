import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '@/app/core/services';

@Component({
  selector: 'app-manage-assessments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-assessments.component.html',
  styleUrls: ['./manage-assessments.component.scss']
})
export class ManageAssessmentsComponent implements OnInit {
  assessments: any[] = [];
  loading = true;
  showViewModal = false;
  selectedAssessment: any = null;
  assessmentSubmissions: any[] = [];

  async ngOnInit() {
    try {
      await this.loadAssessments();
    } catch (error) {
      console.error('Error loading assessments:', error);
    } finally {
      this.loading = false;
    }
  }

  async loadAssessments() {
    try {
      const assessments = await AdminService.getAllAssessments();
      
      // If no data from API, provide sample data for demonstration
      if (!assessments || assessments.length === 0) {
        this.assessments = [
          {
            id: 1,
            title: "Computer Hardware Basics Quiz",
            description: "Test basic computer hardware knowledge",
            isEnabled: true,
            createdAt: new Date(),
            moduleId: 1,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "What is the primary function of a CPU?",
                  type: "multiple_choice",
                  options: ["Store data", "Process instructions", "Display graphics"],
                  correctAnswer: 1,
                  points: 10
                }
              ]
            }
          },
          {
            id: 2,
            title: "Assembly Fundamentals Assessment",
            description: "Test desktop assembly knowledge",
            isEnabled: true,
            createdAt: new Date(),
            moduleId: 2,
            quiz: {
              questions: [
                {
                  id: 1,
                  question: "What is the first step when installing a CPU?",
                  type: "multiple_choice",
                  options: ["Apply thermal paste", "Lift socket lever", "Install cooler"],
                  correctAnswer: 1,
                  points: 15
                }
              ]
            }
          }
        ];
      } else {
        this.assessments = assessments;
      }
    } catch (error) {
      console.error('Error loading assessments:', error);
      // Provide sample data on error
      this.assessments = [
        {
          id: 1,
          title: "Computer Hardware Basics Quiz",
          description: "Test basic computer hardware knowledge",
          isEnabled: true,
          createdAt: new Date(),
          moduleId: 1
        }
      ];
    }
  }

  viewAssessment(assessment: any) {
    this.selectedAssessment = assessment;
    this.showViewModal = true;
    this.loadAssessmentSubmissions(assessment.id);
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedAssessment = null;
    this.assessmentSubmissions = [];
  }

  async loadAssessmentSubmissions(assessmentId: number) {
    try {
      // For now, we'll use mock data since we don't have a specific endpoint
      // In a real implementation, you would call AdminService.getAssessmentSubmissions(assessmentId)
      this.assessmentSubmissions = [
        {
          id: 1,
          score: 85,
          timeSpentSeconds: 1200,
          isSubmitted: true,
          submittedAt: new Date(),
          student: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com'
          }
        },
        {
          id: 2,
          score: 92,
          timeSpentSeconds: 900,
          isSubmitted: true,
          submittedAt: new Date(Date.now() - 86400000),
          student: {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane.smith@example.com'
          }
        }
      ];
    } catch (error) {
      console.error('Error loading assessment submissions:', error);
      this.assessmentSubmissions = [];
    }
  }

  async refreshSubmissions() {
    if (this.selectedAssessment) {
      await this.loadAssessmentSubmissions(this.selectedAssessment.id);
    }
  }

  getScoreClass(score: number): string {
    if (score >= 90) return 'excellent';
    if (score >= 80) return 'good';
    if (score >= 70) return 'average';
    return 'poor';
  }

  formatTimeSpent(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  viewSubmissionDetails(submission: any) {
    console.log('View submission details:', submission);
    // Implement detailed submission view
  }

  provideFeedback(submission: any) {
    console.log('Provide feedback for:', submission);
    // Implement feedback functionality
  }

  editAssessment(assessment: any) {
    // Navigate to edit page - for now just log
    console.log('Edit assessment:', assessment);
  }

  async deleteAssessment(id: number) {
    if (confirm('Are you sure you want to delete this assessment?')) {
      try {
        await AdminService.deleteAssessment(id);
        await this.loadAssessments();
      } catch (error) {
        console.error('Error deleting assessment:', error);
      }
    }
  }

}
