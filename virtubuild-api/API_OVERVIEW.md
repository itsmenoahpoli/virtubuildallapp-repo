# VirtuBuild API - Complete Backend Overview

## 🎯 **Project Overview**
VirtuBuild is a comprehensive educational platform for virtual PC assembly learning with role-based access control for students, instructors, and administrators. The API provides complete CRUD operations, virtual simulation capabilities, gamification features, and progress tracking.

## 🏗️ **Architecture & Technology Stack**

### **Backend Framework**
- **Node.js** with **TypeScript**
- **Express.js** for REST API
- **TypeORM** for database operations
- **PostgreSQL** as primary database
- **JWT** for authentication
- **Swagger/OpenAPI** for documentation

### **Database Entities**
- **Core Entities**: User, UserRole, Module, LabActivity, Assessment, Grade, PerformanceAnalytics, ModuleActivation
- **New Entities**: StudentGroup, StudentGroupAssignment, StudentProgress, Simulation, Gamification, ModulePrerequisite, AssessmentSubmission

## 📚 **API Modules & Endpoints**

### **1. Authentication Module** (`/api/auth`)
**Purpose**: User authentication and authorization

#### **Endpoints:**
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/refresh` - Refresh JWT token

#### **Features:**
- JWT-based authentication
- Role-based access control (student/instructor/admin)
- Password hashing with bcrypt
- Token refresh mechanism

---

### **2. User Management Module** (`/api/users`)
**Purpose**: User profile management

#### **Endpoints:**
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users/:id` - Get user by ID (admin only)

#### **Features:**
- Profile management
- Role-based access
- User data validation

---

### **3. User Roles Module** (`/api/user-roles`)
**Purpose**: User role management

#### **Endpoints:**
- `GET /api/user-roles` - Get all user roles
- `GET /api/user-roles/:id` - Get role by ID
- `POST /api/user-roles` - Create new role (admin only)
- `PUT /api/user-roles/:id` - Update role (admin only)
- `DELETE /api/user-roles/:id` - Delete role (admin only)

#### **Features:**
- Role-based permissions
- Admin-only role management
- Role validation

---

### **4. Learning Modules** (`/api/modules`)
**Purpose**: Educational module management

#### **Endpoints:**
- `GET /api/modules` - Get all enabled modules
- `GET /api/modules/:id` - Get module by ID
- `POST /api/modules` - Create module (admin only)
- `PUT /api/modules/:id` - Update module (admin only)
- `DELETE /api/modules/:id` - Delete module (admin only)

#### **Features:**
- Module content management
- Prerequisites system
- Module activation control

---

### **5. Laboratory Activities** (`/api/activities`)
**Purpose**: Lab activity management

#### **Endpoints:**
- `GET /api/activities` - Get all activities
- `GET /api/activities/module/:moduleId` - Get activities by module
- `GET /api/activities/:id` - Get activity by ID
- `POST /api/activities` - Create activity (admin only)
- `PUT /api/activities/:id` - Update activity (admin only)
- `DELETE /api/activities/:id` - Delete activity (admin only)

#### **Features:**
- Virtual PC assembly activities
- Component-based learning
- Activity metadata management

---

### **6. Assessments Module** (`/api/assessments`)
**Purpose**: Post-lab assessment management

#### **Endpoints:**
- `GET /api/assessments/module/:moduleId` - Get assessments by module
- `GET /api/assessments/:id` - Get assessment by ID
- `POST /api/assessments` - Create assessment (admin only)
- `PUT /api/assessments/:id` - Update assessment (admin only)
- `DELETE /api/assessments/:id` - Delete assessment (admin only)

#### **Features:**
- Quiz creation and management
- Assessment scoring
- Post-lab evaluation

---

### **7. Grades Module** (`/api/grades`)
**Purpose**: Grade and scoring management

#### **Endpoints:**
- `GET /api/grades/me` - Get my grades (student)
- `GET /api/grades/activity/:activityId` - Get grades for activity (instructor)
- `GET /api/grades` - Get all grades (admin only)
- `POST /api/grades` - Create grade (admin only)
- `PUT /api/grades/:id` - Update grade (admin only)
- `DELETE /api/grades/:id` - Delete grade (admin only)

#### **Features:**
- Student grade tracking
- Instructor grade management
- Performance analytics

---

### **8. Performance Analytics** (`/api/analytics`)
**Purpose**: Learning analytics and insights

#### **Endpoints:**
- `GET /api/analytics/me` - Get my analytics (student)
- `GET /api/analytics` - Get all analytics (admin only)
- `POST /api/analytics` - Create analytics record (admin only)
- `PUT /api/analytics/:id` - Update analytics (admin only)
- `DELETE /api/analytics/:id` - Delete analytics (admin only)

#### **Features:**
- Learning progress tracking
- Performance metrics
- Time spent analytics

---

### **9. Module Activations** (`/api/activations`)
**Purpose**: Module activation for student groups

#### **Endpoints:**
- `GET /api/activations/module/:moduleId` - Get activations by module
- `GET /api/activations` - Get all activations (instructor/admin)
- `POST /api/activations` - Activate module for group (instructor/admin)
- `PUT /api/activations/:id` - Update activation (instructor/admin)
- `DELETE /api/activations/:id` - Deactivate module (instructor/admin)

#### **Features:**
- Group-based module activation
- Instructor control over content access
- Activation status management

---

### **10. Student Groups Management** (`/api/student-groups`)
**Purpose**: Student group organization and management

#### **Endpoints:**
- `POST /api/student-groups` - Create student group (instructor/admin)
- `GET /api/student-groups` - Get all groups (instructor/admin)
- `GET /api/student-groups/:id` - Get group by ID (instructor/admin)
- `PUT /api/student-groups/:id` - Update group (instructor/admin)
- `DELETE /api/student-groups/:id` - Delete group (instructor/admin)
- `POST /api/student-groups/:groupId/students/:studentId` - Assign student to group
- `DELETE /api/student-groups/:groupId/students/:studentId` - Remove student from group
- `GET /api/student-groups/:id/students` - Get students in group
- `GET /api/student-groups/student/:studentId` - Get student's groups

#### **Features:**
- Group creation and management
- Student assignment to groups
- Group-based content access control

---

### **11. Student Progress Tracking** (`/api/student-progress`)
**Purpose**: Track student learning progress

#### **Endpoints:**
- `GET /api/student-progress/me` - Get my progress (student)
- `GET /api/student-progress/assigned-activities` - Get assigned activities (student)
- `GET /api/student-progress/assigned-modules` - Get assigned modules (student)
- `POST /api/student-progress/submit` - Submit progress (student)
- `GET /api/student-progress/activity/:activityId` - Get progress by activity (instructor/admin)
- `GET /api/student-progress/instructor/overview` - Get instructor overview (instructor/admin)
- `GET /api/student-progress/stats/me` - Get completion stats (student)

#### **Features:**
- Activity completion tracking
- Progress submission and updates
- Instructor progress monitoring
- Completion statistics

---

### **12. Virtual PC Assembly Simulation** (`/api/simulations`)
**Purpose**: Virtual PC assembly simulation system

#### **Endpoints:**
- `POST /api/simulations/start` - Start new simulation (student)
- `GET /api/simulations/me` - Get my simulations (student)
- `GET /api/simulations/:id` - Get simulation details (student)
- `POST /api/simulations/:id/components` - Place component in simulation (student)
- `POST /api/simulations/:id/complete` - Complete simulation (student)
- `GET /api/simulations/:id/score` - Get simulation score (student)
- `GET /api/simulations/leaderboard` - Get leaderboard (student)
- `GET /api/simulations/activity/:activityId/components` - Get simulation components (student)

#### **Features:**
- Drag-and-drop PC assembly
- Component placement tracking
- Real-time simulation state
- Scoring and leaderboards
- Progress saving and resuming

---

### **13. Gamification System** (`/api/gamification`)
**Purpose**: Points, badges, and achievement system

#### **Endpoints:**
- `GET /api/gamification/me` - Get my gamification data (student)
- `GET /api/gamification/leaderboard` - Get global leaderboard (student)
- `GET /api/gamification/top-performers` - Get top performers (student)
- `GET /api/gamification/rank/me` - Get my rank (student)
- `POST /api/gamification/achievements/check` - Check for new achievements (student)
- `POST /api/gamification/badges/award` - Award badge (instructor/admin)

#### **Features:**
- Points and leveling system
- Badge and achievement tracking
- Global leaderboards
- Streak tracking
- Performance rewards

---

### **14. Assessment Submissions** (`/api/assessment-submissions`)
**Purpose**: Post-lab assessment submission system

#### **Endpoints:**
- `POST /api/assessment-submissions/submit` - Submit assessment (student)
- `GET /api/assessment-submissions/me` - Get my submissions (student)
- `GET /api/assessment-submissions/history/me` - Get my assessment history (student)
- `GET /api/assessment-submissions/:id` - Get submission by ID (student)
- `GET /api/assessment-submissions/assessment/:assessmentId` - Get submissions by assessment (instructor/admin)
- `POST /api/assessment-submissions/:id/feedback` - Add feedback (instructor/admin)
- `GET /api/assessment-submissions/results/:assessmentId` - Get assessment results (instructor/admin)

#### **Features:**
- Assessment submission tracking
- Automatic scoring
- Instructor feedback system
- Submission history
- Results analytics

---

### **15. Admin Dashboard** (`/api/admin`)
**Purpose**: Comprehensive admin management system

#### **Endpoints:**
- `GET /api/admin/dashboard/stats` - Get dashboard statistics (admin)
- **Users Management:**
  - `GET /api/admin/users` - Get all users
  - `GET /api/admin/users/:id` - Get user by ID
  - `POST /api/admin/users` - Create user
  - `PUT /api/admin/users/:id` - Update user
  - `DELETE /api/admin/users/:id` - Delete user
- **User Roles Management:**
  - `GET /api/admin/user-roles` - Get all roles
  - `GET /api/admin/user-roles/:id` - Get role by ID
  - `POST /api/admin/user-roles` - Create role
  - `PUT /api/admin/user-roles/:id` - Update role
  - `DELETE /api/admin/user-roles/:id` - Delete role
- **Modules Management:**
  - `GET /api/admin/modules` - Get all modules
  - `GET /api/admin/modules/:id` - Get module by ID
  - `POST /api/admin/modules` - Create module
  - `PUT /api/admin/modules/:id` - Update module
  - `DELETE /api/admin/modules/:id` - Delete module
- **Lab Activities Management:**
  - `GET /api/admin/lab-activities` - Get all activities
  - `GET /api/admin/lab-activities/:id` - Get activity by ID
  - `POST /api/admin/lab-activities` - Create activity
  - `PUT /api/admin/lab-activities/:id` - Update activity
  - `DELETE /api/admin/lab-activities/:id` - Delete activity
- **Assessments Management:**
  - `GET /api/admin/assessments` - Get all assessments
  - `GET /api/admin/assessments/:id` - Get assessment by ID
  - `POST /api/admin/assessments` - Create assessment
  - `PUT /api/admin/assessments/:id` - Update assessment
  - `DELETE /api/admin/assessments/:id` - Delete assessment
- **Grades Management:**
  - `GET /api/admin/grades` - Get all grades
  - `GET /api/admin/grades/:id` - Get grade by ID
  - `POST /api/admin/grades` - Create grade
  - `PUT /api/admin/grades/:id` - Update grade
  - `DELETE /api/admin/grades/:id` - Delete grade
- **Performance Analytics Management:**
  - `GET /api/admin/performance-analytics` - Get all analytics
  - `GET /api/admin/performance-analytics/:id` - Get analytics by ID
  - `POST /api/admin/performance-analytics` - Create analytics
  - `PUT /api/admin/performance-analytics/:id` - Update analytics
  - `DELETE /api/admin/performance-analytics/:id` - Delete analytics
- **Module Activations Management:**
  - `GET /api/admin/module-activations` - Get all activations
  - `GET /api/admin/module-activations/:id` - Get activation by ID
  - `POST /api/admin/module-activations` - Create activation
  - `PUT /api/admin/module-activations/:id` - Update activation
  - `DELETE /api/admin/module-activations/:id` - Delete activation

#### **Features:**
- Complete CRUD operations for all entities
- Dashboard statistics and analytics
- System-wide data management
- Admin-only access control

---

### **16. System Health** (`/api/system`)
**Purpose**: System monitoring and health checks

#### **Endpoints:**
- `GET /api/system/healthcheck` - System health status
- `GET /api/system/info` - System information

#### **Features:**
- Health monitoring
- System status reporting
- API availability checks

---

## 🔐 **Authentication & Authorization**

### **Authentication Methods:**
- **JWT Tokens**: Secure token-based authentication
- **Bearer Token**: Authorization header with JWT
- **Token Refresh**: Automatic token renewal

### **Role-Based Access Control:**
- **Student**: Access to assigned content, progress tracking, simulations
- **Instructor**: Student management, grade tracking, content activation
- **Admin**: Full system access, user management, analytics

### **Security Features:**
- Password hashing with bcrypt
- JWT token expiration
- Role-based endpoint protection
- Input validation and sanitization

---

## 📊 **Database Schema**

### **Core Entities:**
- **User**: User accounts and profiles
- **UserRole**: Role definitions and permissions
- **Module**: Learning modules and content
- **LabActivity**: Virtual lab activities
- **Assessment**: Post-lab assessments
- **Grade**: Student grades and scores
- **PerformanceAnalytics**: Learning analytics
- **ModuleActivation**: Module access control

### **New Entities:**
- **StudentGroup**: Student group management
- **StudentGroupAssignment**: Student-to-group relationships
- **StudentProgress**: Learning progress tracking
- **Simulation**: Virtual PC assembly state
- **Gamification**: Points, badges, achievements
- **ModulePrerequisite**: Module dependencies
- **AssessmentSubmission**: Assessment submissions

---

## 🎮 **Key Features Implemented**

### **1. Virtual PC Assembly Simulation**
- Drag-and-drop component placement
- Real-time simulation state tracking
- Component inventory management
- Progress saving and resuming
- Scoring and performance metrics

### **2. Gamification System**
- Points and leveling system
- Badge and achievement tracking
- Global leaderboards
- Streak tracking
- Performance rewards

### **3. Student Group Management**
- Group creation and management
- Student assignment to groups
- Group-based content access
- Instructor group control

### **4. Progress Tracking**
- Activity completion tracking
- Progress submission system
- Instructor progress monitoring
- Completion statistics
- Learning analytics

### **5. Assessment System**
- Post-lab assessment submission
- Automatic scoring
- Instructor feedback system
- Submission history
- Results analytics

### **6. Admin Dashboard**
- Complete system management
- Dashboard statistics
- User and content management
- Analytics and reporting

---

## 📚 **Learning Modules Structure**

### **Module 1: Introduction to Tools/Components**
- Tool identification activities
- Component sorting exercises
- Post-lab assessment

### **Module 2: Desktop/Laptop/Motherboard Assembly**
- Storage media handling
- Monitor connection
- UEFI interface simulation
- OS loading simulation
- Post-lab assessment

### **Module 3: Advanced Tasks**
- Motherboard installation
- CPU, RAM, and storage setup
- Power system connection
- UEFI interface boot
- Post-lab assessment

---

## 🚀 **API Documentation**

### **Swagger/OpenAPI Integration:**
- Complete API documentation
- Interactive API testing
- Request/response schemas
- Authentication examples
- Error handling documentation

### **Access Points:**
- **Swagger UI**: `http://localhost:9000/api-docs`
- **API Base URL**: `http://localhost:9000/api`

---

## 🔧 **Development & Deployment**

### **Development Commands:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm test            # Run tests
```

### **Environment Configuration:**
- Database connection settings
- JWT secret configuration
- CORS and security settings
- Logging and monitoring

---

## 📈 **Performance & Monitoring**

### **Analytics Features:**
- Learning progress tracking
- Performance metrics
- Time spent analytics
- Completion rates
- Error tracking

### **System Monitoring:**
- Health check endpoints
- System status reporting
- API availability monitoring
- Database connection monitoring

---

## 🎯 **Future Enhancements**

### **Planned Features:**
- Real-time collaboration
- Advanced analytics
- Mobile app integration
- Third-party integrations
- Enhanced gamification

### **Scalability Considerations:**
- Database optimization
- Caching strategies
- Load balancing
- Microservices architecture

---

## 📝 **API Usage Examples**

### **Student Workflow:**
1. Login and get assigned activities
2. Start virtual PC assembly simulation
3. Complete activities and submit progress
4. Take post-lab assessments
5. View grades and analytics
6. Track gamification progress

### **Instructor Workflow:**
1. Create student groups
2. Assign students to groups
3. Activate modules for groups
4. Monitor student progress
5. Grade assessments
6. Provide feedback

### **Admin Workflow:**
1. Manage users and roles
2. Create and manage content
3. Monitor system analytics
4. Manage student groups
5. System administration

---

This comprehensive API provides a complete educational platform for virtual PC assembly learning with full role-based access control, gamification features, and comprehensive management capabilities.
