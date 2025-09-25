# Admin API Documentation

This document describes the comprehensive admin API endpoints for managing all entities in the Virtubuild system.

## Base URL
All admin endpoints are prefixed with `/api/admin`

## Authentication
All admin endpoints require proper authentication and authorization. Ensure you have admin privileges before accessing these endpoints.

## Dashboard & Statistics

### Get Dashboard Statistics
- **GET** `/api/admin/dashboard/stats`
- **Query Parameters:**
  - `period` (optional): Filter by time period (`week`, `month`, `year`, or `all`)
- **Response:** Comprehensive dashboard statistics including user counts, module statistics, performance metrics, and recent activity

## User Management

### Users
- **GET** `/api/admin/users` - Get all users
- **GET** `/api/admin/users/:id` - Get user by ID
- **POST** `/api/admin/users` - Create new user
- **PUT** `/api/admin/users/:id` - Update user
- **DELETE** `/api/admin/users/:id` - Delete user

### User Roles
- **GET** `/api/admin/user-roles` - Get all user roles
- **GET** `/api/admin/user-roles/:id` - Get user role by ID
- **POST** `/api/admin/user-roles` - Create new user role
- **PUT** `/api/admin/user-roles/:id` - Update user role
- **DELETE** `/api/admin/user-roles/:id` - Delete user role

## Module Management

### Modules
- **GET** `/api/admin/modules` - Get all modules
- **GET** `/api/admin/modules/:id` - Get module by ID
- **POST** `/api/admin/modules` - Create new module
- **PUT** `/api/admin/modules/:id` - Update module
- **DELETE** `/api/admin/modules/:id` - Delete module

### Lab Activities
- **GET** `/api/admin/lab-activities` - Get all lab activities
- **GET** `/api/admin/lab-activities/:id` - Get lab activity by ID
- **POST** `/api/admin/lab-activities` - Create new lab activity
- **PUT** `/api/admin/lab-activities/:id` - Update lab activity
- **DELETE** `/api/admin/lab-activities/:id` - Delete lab activity

### Assessments
- **GET** `/api/admin/assessments` - Get all assessments
- **GET** `/api/admin/assessments/:id` - Get assessment by ID
- **POST** `/api/admin/assessments` - Create new assessment
- **PUT** `/api/admin/assessments/:id` - Update assessment
- **DELETE** `/api/admin/assessments/:id` - Delete assessment

## Performance & Analytics

### Grades
- **GET** `/api/admin/grades` - Get all grades
- **GET** `/api/admin/grades/:id` - Get grade by ID
- **POST** `/api/admin/grades` - Create new grade
- **PUT** `/api/admin/grades/:id` - Update grade
- **DELETE** `/api/admin/grades/:id` - Delete grade

### Performance Analytics
- **GET** `/api/admin/performance-analytics` - Get all performance analytics
- **GET** `/api/admin/performance-analytics/:id` - Get performance analytics by ID
- **POST** `/api/admin/performance-analytics` - Create new performance analytics
- **PUT** `/api/admin/performance-analytics/:id` - Update performance analytics
- **DELETE** `/api/admin/performance-analytics/:id` - Delete performance analytics

### Module Activations
- **GET** `/api/admin/module-activations` - Get all module activations
- **GET** `/api/admin/module-activations/:id` - Get module activation by ID
- **POST** `/api/admin/module-activations` - Create new module activation
- **PUT** `/api/admin/module-activations/:id` - Update module activation
- **DELETE** `/api/admin/module-activations/:id` - Delete module activation

## Data Transfer Objects (DTOs)

### User Data
```typescript
{
  userRoleId?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  isEnabled?: boolean;
}
```

### User Role Data
```typescript
{
  name: string;
  isEnabled?: boolean;
}
```

### Module Data
```typescript
{
  title: string;
  description?: string;
  steps?: any;
  isEnabled?: boolean;
}
```

### Lab Activity Data
```typescript
{
  moduleId: number;
  title: string;
  description?: string;
  componentsMetadata?: any;
  gamification?: any;
  isEnabled?: boolean;
}
```

### Assessment Data
```typescript
{
  moduleId: number;
  quiz: any;
  isEnabled?: boolean;
}
```

### Grade Data
```typescript
{
  userId: number;
  activityId: number;
  score: number; // 0-100
  breakdown?: any;
}
```

### Performance Analytics Data
```typescript
{
  userId: number;
  activityId: number;
  timeSpentSeconds?: number;
  errorCount?: number;
  trends?: any;
}
```

### Module Activation Data
```typescript
{
  moduleId: number;
  groupName: string;
  isActive?: boolean;
}
```

## Dashboard Statistics Response

The dashboard statistics endpoint returns comprehensive data including:

### Overview Statistics
- Total and active user counts
- Total and active module counts
- Total and active activity counts
- Total and active assessment counts
- Total grades and average grade
- Total analytics and average time spent
- Total and active activation counts

### Recent Activity
- Recent users (last 5)
- Recent grades (last 10)

### Top Performers
- Top 5 users by average score
- Includes user details and performance metrics

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

Error responses include a descriptive error message:
```json
{
  "error": "Error description"
}
```

## Validation

All POST and PUT requests are validated using class-validator decorators. Invalid data will return a 400 Bad Request with validation error details.

## Security Notes

- All admin endpoints should be protected with proper authentication middleware
- Consider implementing role-based access control to ensure only admin users can access these endpoints
- Password fields are automatically encrypted before storage
- All database operations include proper error handling and validation
