# AI Agent Frontend Code Generation Guide

## Tech Stack Requirements
- **Runtime**: Node.js 22+
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite or Create React App
- **State Management**: Zustand, Redux Toolkit, or Context API
- **Styling**: Tailwind CSS, CSS Modules, or Styled Components
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Testing Library + Vitest
- **Documentation**: Storybook + JSDoc
- **Package Manager**: npm/pnpm

## Planning Mode Protocol
> **Remember**: Always use plan mode first, build comprehensive checklists, implement iteratively, test thoroughly, and fix any issues before final delivery.

### 1. Analysis Phase
Before writing any code, analyze the requirements and create a detailed plan:

#### Requirements Analysis
- [ ] Understand the UI/UX requirements and user stories
- [ ] Identify components, pages, and routing needs
- [ ] List external APIs and data fetching requirements
- [ ] Define responsive design and accessibility requirements
- [ ] Determine state management complexity and approach

### 2. Architecture Planning
Design the solution architecture:

#### Architecture Plan
- [ ] Define component hierarchy and composition
- [ ] Design state management structure and data flow
- [ ] Plan routing structure and navigation
- [ ] Identify reusable components and custom hooks
- [ ] Consider performance optimization strategies
- [ ] Plan error boundaries and loading states

### 3. Implementation Checklist

#### Pre-Development
- [ ] Set up TypeScript interfaces for props and state
- [ ] Define component structure and file organization
- [ ] Plan custom hooks for business logic
- [ ] Design API service layer and data types
- [ ] Set up routing and layout components

#### Core Development
- [ ] Implement TypeScript interfaces and types
- [ ] Create reusable UI components with proper props
- [ ] Implement custom hooks for state and effects
- [ ] Add form validation and input handling
- [ ] Implement error boundaries and loading states
- [ ] Add responsive design and accessibility features

#### Testing & Documentation
- [ ] Write unit tests for all components and hooks
- [ ] Create integration tests for user flows
- [ ] Add Storybook stories for component documentation
- [ ] Include JSDoc comments for all components and hooks
- [ ] Test error scenarios and edge cases
- [ ] Verify accessibility with screen readers

#### Code Quality
- [ ] Run ESLint and fix all linting issues
- [ ] Format code with Prettier
- [ ] Ensure TypeScript compilation without errors
- [ ] Verify all tests pass
- [ ] Check test coverage meets requirements (>80%)
- [ ] Validate bundle size and performance

## Code Generation Standards

### React Component Best Practices
```typescript
// Functional component with proper TypeScript typing
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  className?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onEdit, 
  className = '' 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(user);
    }
    setIsEditing(false);
  }, [user, onEdit]);

  return (
    <div className={`user-card ${className}`}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <button onClick={handleEdit} aria-label={`Edit ${user.name}`}>
          Edit
        </button>
      )}
    </div>
  );
};

export default UserCard;
```

### Custom Hooks Pattern
```typescript
// Custom hook with proper typing and error handling
interface UseUserData {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useUserData = (): UseUserData => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};
```

### State Management with Zustand
```typescript
// Type-safe store with proper error handling
interface UserStore {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  setUsers: (users: User[]) => void;
  selectUser: (user: User) => void;
  addUser: (user: CreateUserRequest) => Promise<void>;
  updateUser: (id: string, updates: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  clearError: () => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  users: [],
  selectedUser: null,
  loading: false,
  error: null,

  setUsers: (users) => set({ users }),
  selectUser: (user) => set({ selectedUser: user }),

  addUser: async (userData) => {
    set({ loading: true, error: null });
    try {
      const newUser = await userService.createUser(userData);
      set((state) => ({ 
        users: [...state.users, newUser],
        loading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create user',
        loading: false 
      });
    }
  },

  clearError: () => set({ error: null })
}));
```

### Testing Standards
```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCard from './UserCard';

describe('UserCard', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };

  it('renders user information correctly', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const mockOnEdit = jest.fn();
    const user = userEvent.setup();
    
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />);
    
    const editButton = screen.getByLabelText(`Edit ${mockUser.name}`);
    await user.click(editButton);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<UserCard user={mockUser} />);
    
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});

// Custom hook testing
import { renderHook, act } from '@testing-library/react';
import { useUserData } from './useUserData';

describe('useUserData', () => {
  it('should fetch users on mount', async () => {
    const mockUsers = [mockUser];
    jest.spyOn(userService, 'getUsers').mockResolvedValue({ data: mockUsers });

    const { result } = renderHook(() => useUserData());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.users).toEqual(mockUsers);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle fetch errors', async () => {
    const errorMessage = 'Network error';
    jest.spyOn(userService, 'getUsers').mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useUserData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.users).toEqual([]);
    });
  });
});
```

### Storybook Documentation
```typescript
// Component story with proper controls and documentation
import type { Meta, StoryObj } from '@storybook/react';
import UserCard from './UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for displaying user information with optional edit functionality.'
      }
    }
  },
  argTypes: {
    user: {
      description: 'User object containing name and email',
      control: { type: 'object' }
    },
    onEdit: {
      description: 'Callback function called when edit button is clicked',
      control: { type: 'function' }
    },
    className: {
      description: 'Additional CSS classes for styling',
      control: { type: 'text' }
    }
  }
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    user: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  }
};

export const WithEditFunction: Story = {
  args: {
    ...Default.args,
    onEdit: (user) => alert(`Editing ${user.name}`)
  }
};

export const CustomStyling: Story = {
  args: {
    ...Default.args,
    className: 'border-2 border-blue-500 p-4'
  }
};
```

## Error Handling Protocol

### Step-by-Step Error Resolution
1. **Identify Error Type**
   - TypeScript compilation errors
   - React rendering errors
   - Hook dependency warnings
   - Test failures
   - Linting violations
   - Bundle/build errors

2. **Fix Methodology**
   - Check React DevTools for component issues
   - Verify TypeScript types and interfaces
   - Ensure proper hook dependencies
   - Validate component props and state updates
   - Check for memory leaks and infinite renders

3. **Verification Process**
   - Run TypeScript compiler: `npm run type-check`
   - Execute linter: `npm run lint`
   - Run tests: `npm test`
   - Check test coverage: `npm run test:coverage`
   - Build for production: `npm run build`
   - Check bundle size: `npm run analyze`

## Error Boundary Implementation
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<
  PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Report to error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Performance Optimization

### React Best Practices
- [ ] Use `React.memo()` for expensive components
- [ ] Implement `useMemo()` and `useCallback()` for expensive calculations
- [ ] Use `React.lazy()` and `Suspense` for code splitting
- [ ] Optimize re-renders with proper dependency arrays
- [ ] Implement virtual scrolling for large lists
- [ ] Use `useTransition()` for non-urgent updates

### Bundle Optimization
- [ ] Tree shake unused dependencies
- [ ] Code split by routes and features
- [ ] Optimize images and assets
- [ ] Use proper import strategies
- [ ] Monitor bundle size regularly

## Accessibility Standards

### A11y Checklist
- [ ] Proper semantic HTML elements
- [ ] ARIA labels and descriptions where needed
- [ ] Keyboard navigation support
- [ ] Focus management for modals and dialogs
- [ ] Screen reader testing
- [ ] Color contrast compliance
- [ ] Alternative text for images
- [ ] Form validation and error messaging

## Iterative Improvement Process

### Code Review Checklist
- [ ] **Performance**: No unnecessary re-renders, proper memoization
- [ ] **Accessibility**: WCAG 2.1 AA compliance, keyboard navigation
- [ ] **User Experience**: Intuitive interactions, proper loading states
- [ ] **Maintainability**: Clear component structure, reusable logic
- [ ] **Security**: Input sanitization, XSS prevention
- [ ] **Testing**: Comprehensive test coverage, user-centric tests
- [ ] **Documentation**: Component props documented, usage examples
- [ ] **Types**: Strict TypeScript usage, proper interface definitions

### Refactoring Guidelines
1. **Extract reusable logic** into custom hooks
2. **Compose components** following single responsibility principle
3. **Implement proper state management** patterns
4. **Use proper React patterns** (compound components, render props, etc.)
5. **Optimize bundle size** and runtime performance

## Delivery Standards

### Final Checklist Before Completion
- [ ] All code compiles without TypeScript errors
- [ ] All ESLint rules pass
- [ ] Code is formatted with Prettier
- [ ] All tests pass with >80% coverage
- [ ] Storybook documentation is complete
- [ ] Components are accessible (WCAG 2.1 AA)
- [ ] Performance metrics are within acceptable ranges
- [ ] Bundle size is optimized
- [ ] Cross-browser compatibility verified
- [ ] Mobile responsiveness tested

### Code Delivery Format
When delivering code, always include:

1. **Summary of changes and new features**
2. **Component hierarchy and file structure**
3. **Installation and setup instructions**
4. **Development and build commands**
5. **Storybook and testing documentation**
6. **Performance considerations and metrics**
7. **Known limitations or future improvements**
8. **Browser support and compatibility notes**

## Example Workflow

```markdown
## Implementation Plan for User Management Dashboard

### 1. Planning
- [ ] Design component hierarchy: Dashboard → UserList → UserCard
- [ ] Plan state management with Zustand store
- [ ] Design responsive layout with Tailwind CSS
- [ ] Plan routing with React Router

### 2. Implementation
- [ ] Create TypeScript interfaces for User, UserRequest, UserResponse
- [ ] Implement UserCard component with edit/delete actions
- [ ] Build UserList with sorting, filtering, pagination
- [ ] Create UserForm for add/edit functionality
- [ ] Implement Dashboard layout with navigation

### 3. Testing & Documentation
- [ ] Write unit tests for all components and hooks
- [ ] Create integration tests for user flows
- [ ] Build Storybook stories for all components
- [ ] Add accessibility tests and ARIA labels
- [ ] Test responsive design across devices

### 4. Quality Assurance
- [ ] Run full test suite and ensure >80% coverage
- [ ] Fix all ESLint warnings and errors
- [ ] Verify TypeScript compilation
- [ ] Test accessibility with screen reader
- [ ] Optimize bundle size and performance
- [ ] Cross-browser testing

### 5. Delivery
- [ ] Provide complete working application
- [ ] Include development environment setup
- [ ] Document component API and usage
- [ ] Provide deployment instructions
```

Remember: Always use plan mode first, build comprehensive checklists, implement iteratively, test thoroughly, and fix any issues before final delivery.
