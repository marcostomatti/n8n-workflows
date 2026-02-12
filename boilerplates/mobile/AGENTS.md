# AI Agent React Native Code Generation Guide

## Tech Stack Requirements
- **Runtime**: Node.js 22+
- **Framework**: React Native with Expo SDK 51+
- **Language**: TypeScript
- **Styling**: styled-components/native
- **Navigation**: React Navigation 6+
- **State Management**: Zustand, Redux Toolkit, or Context API
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest + React Native Testing Library + Detox (E2E)
- **Documentation**: Storybook React Native + JSDoc
- **Package Manager**: npm/pnpm/yarn
- **Development**: Expo CLI, EAS CLI

## Planning Mode Protocol
> **Remember**: Always use plan mode first, build comprehensive checklists, implement iteratively, test thoroughly, and fix any issues before final delivery.

### 1. Analysis Phase
Before writing any code, analyze the requirements and create a detailed plan:

#### Requirements Analysis
- [ ] Understand the mobile app requirements and user stories
- [ ] Identify screens, navigation flow, and component needs
- [ ] List device features needed (camera, location, notifications, etc.)
- [ ] Define platform-specific requirements (iOS/Android differences)
- [ ] Determine offline capabilities and data persistence needs
- [ ] Plan app store requirements and deployment strategy

### 2. Architecture Planning
Design the solution architecture:

#### Architecture Plan
- [ ] Define navigation structure and screen hierarchy
- [ ] Design component architecture and reusable UI elements
- [ ] Plan state management structure and data flow
- [ ] Identify native modules and Expo SDK integrations
- [ ] Consider performance optimization for mobile devices
- [ ] Plan error handling and offline scenarios
- [ ] Design responsive layout for different screen sizes

### 3. Implementation Checklist

#### Pre-Development
- [ ] Set up Expo project with TypeScript template
- [ ] Configure styled-components and navigation
- [ ] Set up TypeScript interfaces for data models
- [ ] Plan screen structure and component hierarchy
- [ ] Configure development environment and simulators

#### Core Development
- [ ] Implement TypeScript interfaces and types
- [ ] Create reusable UI components with styled-components
- [ ] Implement navigation structure with React Navigation
- [ ] Add form handling and input validation
- [ ] Implement state management and API integration
- [ ] Add device feature integrations (camera, location, etc.)
- [ ] Handle platform-specific differences (iOS/Android)

#### Testing & Documentation
- [ ] Write unit tests for all components and utilities
- [ ] Create integration tests for navigation flows
- [ ] Add E2E tests with Detox for critical user journeys
- [ ] Build Storybook stories for component documentation
- [ ] Include JSDoc comments for all components and hooks
- [ ] Test on real devices and different screen sizes

#### Code Quality
- [ ] Run ESLint and fix all linting issues
- [ ] Format code with Prettier
- [ ] Ensure TypeScript compilation without errors
- [ ] Verify all tests pass on iOS and Android
- [ ] Check app performance and bundle size
- [ ] Validate accessibility compliance

## Code Generation Standards

### React Native Component Best Practices
```typescript
import React, { useCallback, useState } from 'react';
import styled from 'styled-components/native';

interface UserCardProps {
  user: User;
  onPress?: (user: User) => void;
  testID?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  onPress,
  testID = 'user-card'
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(() => {
    if (onPress) {
      onPress(user);
    }
  }, [user, onPress]);

  return (
    <CardContainer
      testID={testID}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      isPressed={isPressed}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${user.name}`}
    >
      <UserName>{user.name}</UserName>
      <UserEmail>{user.email}</UserEmail>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity<{ isPressed: boolean }>`
  background-color: ${({ theme, isPressed }) => 
    isPressed ? theme.colors.background.pressed : theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  margin: ${({ theme }) => theme.spacing.sm}px;
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const UserName = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.lg}px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`;

const UserEmail = styled.Text`
  font-size: ${({ theme }) => theme.typography.sizes.md}px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export default UserCard;
```

### Styled Components Theme System
```typescript
// Theme definition
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: {
      primary: string;
      secondary: string;
      pressed: string;
    };
    text: {
      primary: string;
      secondary: string;
      inverse: string;
    };
    error: string;
    success: string;
    warning: string;
    shadow: string;
  };
  typography: {
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    weights: {
      normal: string;
      bold: string;
      semiBold: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

// Theme provider setup
import { ThemeProvider } from 'styled-components/native';

const theme: Theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: {
      primary: '#FFFFFF',
      secondary: '#F2F2F7',
      pressed: '#E1E1E6',
    },
    text: {
      primary: '#000000',
      secondary: '#8E8E93',
      inverse: '#FFFFFF',
    },
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    shadow: '#000000',
  },
  // ... rest of theme
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        {/* Your app content */}
      </NavigationContainer>
    </ThemeProvider>
  );
};
```

### Navigation Structure
```typescript
// Navigation types
export type RootStackParamList = {
  Home: undefined;
  UserDetail: { userId: string };
  Settings: undefined;
};

export type TabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
};

// Screen component with proper typing
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type UserDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetail'>;

const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const { user, loading, error } = useUser(userId);

  useEffect(() => {
    navigation.setOptions({
      title: user?.name ?? 'Loading...',
    });
  }, [user, navigation]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ScreenContainer>
      <UserProfile user={user} />
    </ScreenContainer>
  );
};
```

### Custom Hooks for React Native
```typescript
// Custom hook for device features
interface UseLocationResult {
  location: Location | null;
  loading: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<void>;
}

const useLocation = (): UseLocationResult => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (err) {
      setError('Failed to request location permission');
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) {
        throw new Error('Location permission denied');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setLocation(location);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setLoading(false);
    }
  }, [requestPermission]);

  return { location, loading, error, requestPermission, getCurrentLocation };
};
```

### Testing Standards
```typescript
// Component testing with React Native Testing Library
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import UserCard from './UserCard';
import { mockTheme } from '../../../__mocks__/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={mockTheme}>
      {component}
    </ThemeProvider>
  );
};

describe('UserCard', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  };

  it('renders user information correctly', () => {
    const { getByText } = renderWithTheme(
      <UserCard user={mockUser} />
    );
    
    expect(getByText(mockUser.name)).toBeTruthy();
    expect(getByText(mockUser.email)).toBeTruthy();
  });

  it('calls onPress when card is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = renderWithTheme(
      <UserCard user={mockUser} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByTestId('user-card'));
    
    expect(mockOnPress).toHaveBeenCalledWith(mockUser);
  });

  it('shows pressed state when touched', () => {
    const { getByTestId } = renderWithTheme(
      <UserCard user={mockUser} />
    );
    
    const card = getByTestId('user-card');
    fireEvent(card, 'pressIn');
    
    // Test visual feedback for pressed state
    expect(card.props.style).toMatchObject({
      backgroundColor: mockTheme.colors.background.pressed
    });
  });
});

// E2E testing with Detox
describe('User Management Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate to user detail when card is pressed', async () => {
    await waitFor(element(by.testID('user-list')))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.testID('user-card-1')).tap();
    
    await waitFor(element(by.testID('user-detail-screen')))
      .toBeVisible()
      .withTimeout(3000);

    await expect(element(by.text('John Doe'))).toBeVisible();
  });
});
```

### Storybook Documentation
```typescript
// Storybook setup for React Native
import type { Meta, StoryObj } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components/native';
import UserCard from './UserCard';
import { defaultTheme } from '../../theme';

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
  decorators: [
    (Story) => (
      <ThemeProvider theme={defaultTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'A pressable card component for displaying user information in React Native.'
      }
    }
  },
  argTypes: {
    user: {
      description: 'User object containing name and email',
      control: { type: 'object' }
    },
    onPress: {
      description: 'Callback function called when card is pressed',
      control: { type: 'function' }
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

export const WithPressHandler: Story = {
  args: {
    ...Default.args,
    onPress: (user) => console.log(`Pressed ${user.name}`)
  }
};
```

## Error Handling Protocol

### Step-by-Step Error Resolution
1. **Identify Error Type**
   - TypeScript compilation errors
   - React Native bundling errors
   - Platform-specific build errors (iOS/Android)
   - Runtime errors on device/simulator
   - Navigation errors
   - Styled-components theme errors

2. **Fix Methodology**
   - Check Metro bundler logs for build issues
   - Verify TypeScript types and interfaces
   - Test on both iOS and Android platforms
   - Check device-specific permissions and features
   - Validate styled-components theme usage
   - Use React Native debugger for runtime issues

3. **Verification Process**
   - Run TypeScript compiler: `npx tsc --noEmit`
   - Execute linter: `npm run lint`
   - Run tests: `npm test`
   - Test on iOS: `expo run:ios`
   - Test on Android: `expo run:android`
   - Build for production: `eas build`

## Platform-Specific Considerations

### iOS/Android Differences
```typescript
import { Platform } from 'react-native';

const PlatformSpecificButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${Platform.OS === 'ios' ? '12px' : '8px'};
  ${Platform.OS === 'ios' && `
    shadow-color: ${({ theme }) => theme.colors.shadow};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
  `}
  ${Platform.OS === 'android' && `
    elevation: 4;
  `}
`;

// Platform-specific code
const handleNotification = () => {
  if (Platform.OS === 'ios') {
    // iOS-specific notification handling
  } else {
    // Android-specific notification handling
  }
};
```

### Performance Optimization

### React Native Best Practices
- [ ] Use `React.memo()` for expensive components
- [ ] Implement `useMemo()` and `useCallback()` for heavy computations
- [ ] Use `FlatList` or `VirtualizedList` for large datasets
- [ ] Optimize images with proper sizing and caching
- [ ] Use `InteractionManager` for post-interaction tasks
- [ ] Implement proper navigation optimization
- [ ] Use `runOnJS` for Reanimated worklets

### Bundle Optimization
- [ ] Configure Metro bundler for tree shaking
- [ ] Use Expo dev builds for smaller bundle sizes
- [ ] Optimize native dependencies
- [ ] Use code splitting where applicable
- [ ] Monitor bundle size with `expo bundle-size`

## Accessibility Standards

### Mobile A11y Checklist
- [ ] Proper accessibility labels and hints
- [ ] Screen reader support (TalkBack/VoiceOver)
- [ ] Sufficient touch target sizes (44x44pt minimum)
- [ ] Color contrast compliance for mobile
- [ ] Voice control support
- [ ] Reduced motion preferences
- [ ] Dynamic text size support
- [ ] Focus management for screen readers

```typescript
// Accessibility implementation
const AccessibleButton = styled.TouchableOpacity`
  min-height: 44px;
  min-width: 44px;
  padding: ${({ theme }) => theme.spacing.md}px;
`;

<AccessibleButton
  accessibilityRole="button"
  accessibilityLabel="Save user information"
  accessibilityHint="Double tap to save the current user data"
  onPress={handleSave}
>
  <ButtonText>Save</ButtonText>
</AccessibleButton>
```

## Iterative Improvement Process

### Code Review Checklist
- [ ] **Performance**: No unnecessary re-renders, optimized lists
- [ ] **Accessibility**: Screen reader support, proper touch targets
- [ ] **User Experience**: Smooth animations, proper loading states
- [ ] **Platform Consistency**: Follows iOS/Android design guidelines
- [ ] **Security**: Secure storage, API security, input validation
- [ ] **Testing**: Device testing, cross-platform compatibility
- [ ] **Documentation**: Component props documented, usage examples
- [ ] **Types**: Strict TypeScript usage, proper navigation typing

### Refactoring Guidelines
1. **Extract reusable logic** into custom hooks
2. **Create atomic components** with styled-components
3. **Implement proper navigation** structure and typing
4. **Optimize for mobile performance** and battery usage
5. **Follow platform-specific** design patterns

## Delivery Standards

### Final Checklist Before Completion
- [ ] All code compiles without TypeScript errors
- [ ] All ESLint rules pass
- [ ] Code is formatted with Prettier
- [ ] All tests pass on iOS and Android
- [ ] Storybook documentation is complete
- [ ] App is accessible (WCAG Mobile guidelines)
- [ ] Performance is optimized for mobile devices
- [ ] Cross-platform compatibility verified
- [ ] App store guidelines compliance checked
- [ ] Production build tested on real devices

### Code Delivery Format
When delivering code, always include:

1. **Summary of changes and new features**
2. **Component hierarchy and screen structure**
3. **Installation and setup instructions**
4. **Development and build commands**
5. **Testing instructions for iOS/Android**
6. **Storybook and documentation links**
7. **Performance considerations and metrics**
8. **Platform-specific notes and requirements**
9. **App store deployment preparation**
10. **Known limitations or future improvements**

## Example Workflow

```markdown
## Implementation Plan for Social Media Mobile App

### 1. Planning
- [ ] Design navigation: Auth Stack → Tab Navigator (Feed, Profile, Settings)
- [ ] Plan component hierarchy: PostCard, UserAvatar, CommentList
- [ ] Design state management with Zustand for posts and user data
- [ ] Plan camera integration for photo uploads
- [ ] Design offline support with async storage

### 2. Implementation
- [ ] Set up Expo project with TypeScript template
- [ ] Configure styled-components theme system
- [ ] Implement authentication flow with secure storage
- [ ] Create reusable UI components (PostCard, Button, Input)
- [ ] Build feed screen with infinite scroll (FlatList)
- [ ] Add camera integration with expo-camera
- [ ] Implement push notifications with expo-notifications

### 3. Testing & Documentation
- [ ] Write unit tests for all components and hooks
- [ ] Create E2E tests for critical user flows (login, post creation)
- [ ] Build Storybook for component documentation
- [ ] Test on real iOS and Android devices
- [ ] Verify accessibility with TalkBack/VoiceOver
- [ ] Test offline functionality and data persistence

### 4. Quality Assurance
- [ ] Run full test suite on both platforms
- [ ] Fix all TypeScript and linting errors
- [ ] Optimize app performance and bundle size
- [ ] Test with TestFlight (iOS) and internal testing (Android)
- [ ] Verify app store compliance and guidelines
- [ ] Test on different device sizes and orientations

### 5. Delivery
- [ ] Provide complete working React Native app
- [ ] Include development environment setup guide
- [ ] Document component API and navigation structure
- [ ] Provide app store deployment instructions
- [ ] Include performance optimization notes
```

Remember: Always use plan mode first, build comprehensive checklists, implement iteratively, test thoroughly on both platforms, and fix any issues before final delivery.
