import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '@/app/core/services';

@Component({
  selector: 'app-create-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.scss']
})
export class CreateAssessmentComponent implements OnInit {
  assessmentForm: FormGroup;
  loading = false;
  labActivities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.assessmentForm = this.fb.group({
      labActivityId: [null, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      timeLimitMinutes: [45, [Validators.required, Validators.min(1), Validators.max(180)]],
      isEnabled: [true],
      questions: this.fb.array([])
    });
  }

  async ngOnInit() {
    // Load lab activities
    await this.loadLabActivities();
    // Add initial question
    this.addQuestion();
  }

  async loadLabActivities() {
    try {
      this.labActivities = await AdminService.getAllLabActivities();
    } catch (error) {
      console.error('Error loading lab activities:', error);
      this.labActivities = [];
    }
  }

  get questionsArray(): FormArray {
    return this.assessmentForm.get('questions') as FormArray;
  }

  getOptionsArray(question: any): any[] {
    return (question.get('options') as FormArray).controls;
  }

  createQuestionForm(): FormGroup {
    return this.fb.group({
      questionText: ['', [Validators.required]],
      questionType: ['multiple_choice', [Validators.required]],
      options: this.fb.array([]),
      correctAnswer: [0, [Validators.required]],
      points: [15, [Validators.required, Validators.min(1), Validators.max(100)]],
      explanation: ['']
    });
  }

  createOptionForm(value: string = '', isCorrect: boolean = false): FormGroup {
    return this.fb.group({
      value: [value, [Validators.required]],
      isCorrect: [isCorrect]
    });
  }

  addQuestion() {
    const questionForm = this.createQuestionForm();
    this.questionsArray.push(questionForm);
    
    // Add initial options for multiple choice
    const optionsArray = questionForm.get('options') as FormArray;
    optionsArray.push(this.createOptionForm('Option 1', true));
    optionsArray.push(this.createOptionForm('Option 2', false));
    optionsArray.push(this.createOptionForm('Option 3', false));
    optionsArray.push(this.createOptionForm('Option 4', false));
  }

  removeQuestion(index: number) {
    if (this.questionsArray.length > 1) {
      this.questionsArray.removeAt(index);
    }
  }

  addOption(questionIndex: number) {
    const questionForm = this.questionsArray.at(questionIndex) as FormGroup;
    const optionsArray = questionForm.get('options') as FormArray;
    optionsArray.push(this.createOptionForm('', false));
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const questionForm = this.questionsArray.at(questionIndex) as FormGroup;
    const optionsArray = questionForm.get('options') as FormArray;
    if (optionsArray.length > 2) {
      optionsArray.removeAt(optionIndex);
    }
  }

  onQuestionTextChange(questionIndex: number, event: any) {
    const questionForm = this.questionsArray.at(questionIndex) as FormGroup;
    questionForm.get('questionText')?.setValue(event.target.innerHTML);
  }

  onQuestionTextBlur(questionIndex: number, event: any) {
    const questionForm = this.questionsArray.at(questionIndex) as FormGroup;
    questionForm.get('questionText')?.setValue(event.target.innerHTML);
    questionForm.get('questionText')?.markAsTouched();
  }

  onQuestionTypeChange(questionIndex: number, event: any) {
    const type = event.target.value;
    const questionForm = this.questionsArray.at(questionIndex) as FormGroup;
    const optionsArray = questionForm.get('options') as FormArray;
    
    // Clear existing options
    optionsArray.clear();
    
    if (type === 'multiple_choice') {
      // Add 4 default options for multiple choice
      optionsArray.push(this.createOptionForm('Option 1', true));
      optionsArray.push(this.createOptionForm('Option 2', false));
      optionsArray.push(this.createOptionForm('Option 3', false));
      optionsArray.push(this.createOptionForm('Option 4', false));
    } else if (type === 'enumeration') {
      // Add 3 default enumeration items
      optionsArray.push(this.createOptionForm('Item 1', true));
      optionsArray.push(this.createOptionForm('Item 2', true));
      optionsArray.push(this.createOptionForm('Item 3', true));
    }
  }

  onSubmit() {
    if (this.assessmentForm.valid) {
      this.loading = true;
      
      // Process the form data
      const assessmentData = {
        ...this.assessmentForm.value,
        questions: this.assessmentForm.value.questions.map((q: any) => ({
          ...q,
          options: q.options.map((opt: any, index: number) => ({
            ...opt,
            order: index + 1
          }))
        }))
      };

      // Here you would call your API to save the assessment
      console.log('Assessment data:', assessmentData);
      
      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/admin/contents/assessments']);
      }, 1000);
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched() {
    Object.keys(this.assessmentForm.controls).forEach(key => {
      const control = this.assessmentForm.get(key);
      control?.markAsTouched();
    });
  }

  cancel() {
    this.router.navigate(['/admin/contents/assessments']);
  }
}
