## Tech Stack Requirements
- **Runtime**: Node.js 22+
- **Framework**: Express.js
- **Language**: TypeScript
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest/Vitest with unit tests
- **Documentation**: Swagger/OpenAPI + JSDoc
- **Package Manager**: npm/pnpm

## Planning Mode Protocol
> **Remember**: Always use plan mode first, build comprehensive checklists, implement iteratively, test thoroughly, and fix any issues before final delivery.

### 1. Analysis Phase
Before writing any code, analyze the requirements and create a detailed plan:

#### Requirements Analysis
- [ ] Understand the feature/bug/enhancement request
- [ ] Identify affected components and services
- [ ] List dependencies and external integrations
- [ ] Define success criteria and acceptance tests

### 2. Architecture Planning
Design the solution architecture:

#### Architecture Plan
- [ ] Define API endpoints and HTTP methods
- [ ] Design data models and interfaces
- [ ] Plan middleware and error handling
- [ ] Identify reusable components
- [ ] Consider security and performance implications

### 3. Implementation Checklist

#### Pre-Development
- [ ] Set up TypeScript interfaces and types
- [ ] Define API routes and controllers structure
- [ ] Plan middleware chain and error handling
- [ ] Design database schema (if applicable)

#### Core Development
- [ ] Implement TypeScript interfaces and types
- [ ] Create Express routes with proper HTTP methods
- [ ] Implement controllers with business logic
- [ ] Add input validation and sanitization
- [ ] Implement error handling middleware
- [ ] Add logging and monitoring

#### Testing & Documentation
- [ ] Write unit tests for all functions
- [ ] Create integration tests for API endpoints
- [ ] Add Swagger/OpenAPI documentation
- [ ] Include JSDoc comments for all functions
- [ ] Test error scenarios and edge cases

#### Code Quality
- [ ] Run ESLint and fix all linting issues
- [ ] Format code with Prettier
- [ ] Ensure TypeScript compilation without errors
- [ ] Verify all tests pass
- [ ] Check test coverage meets requirements (>80%)

## Code Generation Standards

### TypeScript Best Practices
```typescript
// Use strict types, avoid 'any'
interface UserRequest {
  email: string;
  name: string;
  age?: number;
}

// Proper error handling with custom types
class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Use async/await with proper error handling
const createUser = async (userData: UserRequest): Promise<User> => {
  try {
    // Implementation
  } catch (error) {
    logger.error('Failed to create user:', error);
    throw error;
  }
};
```

### Express.js Structure
```typescript
// Route definition with proper typing
router.post('/users', 
  validateUserInput,
  asyncHandler(userController.createUser)
);

// Controller with proper error handling
export const createUser = async (req: Request<{}, User, UserRequest>, res: Response) => {
  const userData = req.body;
  const user = await userService.createUser(userData);
  res.status(201).json({ success: true, data: user });
};

// Middleware with proper typing
const validateUserInput = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
```

### Testing Standards
```typescript
// Unit test example
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
    });

    it('should throw ValidationError for invalid email', async () => {
      // Arrange
      const userData = { email: 'invalid', name: 'Test User' };
      
      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects.toThrow(ValidationError);
    });
  });
});
```

### Swagger Documentation
```typescript
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Validation error
 */
```

## Error Handling Protocol

### Step-by-Step Error Resolution
1. **Identify Error Type**
   - Syntax errors (TypeScript compilation)
   - Runtime errors (logical issues)
   - Test failures
   - Linting violations

2. **Fix Methodology**
   - Read error messages carefully
   - Check TypeScript types and interfaces
   - Verify import/export statements
   - Ensure proper async/await usage
   - Validate test assertions

3. **Verification Process**
   - Run TypeScript compiler: `npm run type-check`
   - Execute linter: `npm run lint`
   - Run tests: `npm test`
   - Check test coverage: `npm run test:coverage`

## Iterative Improvement Process

### Code Review Checklist
- [ ] **Security**: No sensitive data exposure, proper input validation
- [ ] **Performance**: Efficient algorithms, proper database queries
- [ ] **Maintainability**: Clear naming, proper separation of concerns
- [ ] **Testability**: Functions are pure when possible, easy to mock
- [ ] **Documentation**: All public APIs documented, README updated
- [ ] **Error Handling**: Comprehensive error scenarios covered
- [ ] **Logging**: Appropriate log levels and messages
- [ ] **Types**: Strict TypeScript usage, no implicit any

### Refactoring Guidelines
1. **Extract reusable logic** into services/utilities
2. **Implement proper separation** of concerns (routes → controllers → services)
3. **Use dependency injection** for better testability
4. **Apply SOLID principles** where applicable
5. **Optimize imports** and remove unused code

## Delivery Standards

### Final Checklist Before Completion
- [ ] All code compiles without TypeScript errors
- [ ] All ESLint rules pass
- [ ] Code is formatted with Prettier
- [ ] All tests pass with >80% coverage
- [ ] Swagger documentation is complete and accurate
- [ ] README is updated with new features
- [ ] Error scenarios are handled and tested
- [ ] Security best practices are followed
- [ ] Performance considerations are addressed

### Code Delivery Format
When delivering code, always include:

1. **Summary of changes**
2. **File structure** with new/modified files
3. **Installation/setup instructions**
4. **Test execution commands**
5. **API documentation links**
6. **Known limitations or future improvements**

## Example Workflow

```markdown
## Implementation Plan for User Management API

### 1. Planning
- [ ] Create TypeScript interfaces for User, UserRequest, UserResponse
- [ ] Design REST endpoints: GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id
- [ ] Plan validation middleware and error handling

### 2. Implementation
- [ ] Set up route handlers with proper typing
- [ ] Implement user service with CRUD operations
- [ ] Add validation middleware using Joi or similar
- [ ] Create comprehensive error handling

### 3. Testing & Documentation
- [ ] Write unit tests for service layer
- [ ] Create integration tests for API endpoints
- [ ] Add Swagger documentation for all endpoints
- [ ] Update README with API usage examples

### 4. Quality Assurance
- [ ] Run full test suite and ensure >80% coverage
- [ ] Fix all ESLint warnings and errors
- [ ] Verify TypeScript compilation
- [ ] Test error scenarios manually

### 5. Delivery
- [ ] Provide complete working code
- [ ] Include setup and running instructions
- [ ] Document any environment variables or configuration needed
```

