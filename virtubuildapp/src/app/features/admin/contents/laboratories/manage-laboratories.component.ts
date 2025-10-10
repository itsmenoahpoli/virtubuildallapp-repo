import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminService } from '@/app/core/services';

@Component({
  selector: 'app-manage-laboratories',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-laboratories.component.html',
  styleUrls: ['./manage-laboratories.component.scss']
})
export class ManageLaboratoriesComponent implements OnInit {
  laboratories: any[] = [];
  loading = true;
  showCreateForm = false;
  showEditForm = false;
  showViewModal = false;
  selectedLab: any = null;
  labAssessments: any[] = [];
  labProgress: any = {};
  newLab: any = {
    title: '',
    description: '',
    instructions: '',
    isEnabled: true
  };

  async ngOnInit() {
    try {
      await this.loadLaboratories();
    } catch (error) {
      console.error('Error loading laboratories:', error);
    } finally {
      this.loading = false;
    }
  }

  async loadLaboratories() {
    try {
      // Use the existing lab activities endpoint
      const labActivities = await AdminService.getAllLabActivities();
      
      // If no data from API, provide sample data for demonstration
      if (!labActivities || labActivities.length === 0) {
        this.laboratories = [
          {
            id: 1,
            title: "CPU Identification Lab",
            description: "Identify different types of CPUs and their specifications",
            isEnabled: true,
            createdAt: new Date(),
            moduleId: 1
          },
          {
            id: 2,
            title: "Memory Module Recognition",
            description: "Learn to identify RAM types and capacities",
            isEnabled: true,
            createdAt: new Date(),
            moduleId: 1
          },
          {
            id: 3,
            title: "Motherboard Component Mapping",
            description: "Map out motherboard components and connections",
            isEnabled: true,
            createdAt: new Date(),
            moduleId: 1
          }
        ];
      } else {
        this.laboratories = labActivities;
      }
    } catch (error) {
      console.error('Error loading laboratories:', error);
      // Provide sample data on error
      this.laboratories = [
        {
          id: 1,
          title: "CPU Identification Lab",
          description: "Identify different types of CPUs and their specifications",
          isEnabled: true,
          createdAt: new Date(),
          moduleId: 1
        }
      ];
    }
  }

  async createLaboratory() {
    try {
      await AdminService.createLabActivity(this.newLab);
      await this.loadLaboratories();
      this.cancelCreate();
    } catch (error) {
      console.error('Error creating laboratory:', error);
    }
  }

  editLaboratory(lab: any) {
    this.selectedLab = { ...lab };
    this.showEditForm = true;
  }

  async updateLaboratory() {
    try {
      await AdminService.updateLabActivity(this.selectedLab.id, this.selectedLab);
      await this.loadLaboratories();
      this.cancelEdit();
    } catch (error) {
      console.error('Error updating laboratory:', error);
    }
  }

  async deleteLaboratory(id: number) {
    if (confirm('Are you sure you want to delete this laboratory?')) {
      try {
        await AdminService.deleteLabActivity(id);
        await this.loadLaboratories();
      } catch (error) {
        console.error('Error deleting laboratory:', error);
      }
    }
  }

  cancelCreate() {
    this.showCreateForm = false;
    this.newLab = {
      title: '',
      description: '',
      instructions: '',
      isEnabled: true
    };
  }

  cancelEdit() {
    this.showEditForm = false;
    this.selectedLab = null;
  }

  viewLaboratory(lab: any) {
    this.selectedLab = lab;
    this.showViewModal = true;
    this.loadLabAssessments(lab.id);
    this.loadLabProgress(lab.id);
  }

  closeViewModal() {
    this.showViewModal = false;
    this.selectedLab = null;
    this.labAssessments = [];
    this.labProgress = {};
  }

  async loadLabAssessments(labId: number) {
    try {
      // For now, we'll use mock data since we don't have a specific endpoint
      // In a real implementation, you would call AdminService.getAssessmentsByLabActivity(labId)
      this.labAssessments = [
        {
          id: 1,
          title: "Hardware Identification Quiz",
          description: "Test knowledge of computer hardware components",
          timeLimitMinutes: 30,
          isEnabled: true,
          questions: [
            { id: 1, question: "What is the CPU?", points: 10 },
            { id: 2, question: "What is RAM?", points: 10 }
          ]
        }
      ];
    } catch (error) {
      console.error('Error loading lab assessments:', error);
      this.labAssessments = [];
    }
  }

  async loadLabProgress(labId: number) {
    try {
      // Mock progress data
      this.labProgress = {
        totalStudents: 25,
        completedStudents: 18,
        averageTime: '45m',
        completionRate: 72
      };
    } catch (error) {
      console.error('Error loading lab progress:', error);
      this.labProgress = {};
    }
  }

  async refreshProgress() {
    if (this.selectedLab) {
      await this.loadLabProgress(this.selectedLab.id);
    }
  }

  viewAssessment(assessment: any) {
    console.log('View assessment:', assessment);
    // Navigate to assessment view or open assessment modal
  }

  editAssessment(assessment: any) {
    console.log('Edit assessment:', assessment);
    // Navigate to assessment edit page
  }
}
