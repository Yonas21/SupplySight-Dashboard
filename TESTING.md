# Testing Documentation

## Overview

This project includes a comprehensive testing setup using Jest, React Testing Library, and Apollo Client testing utilities. The testing infrastructure is designed to test both utility functions and React components with GraphQL integration.

## Test Setup

### Dependencies

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **@testing-library/user-event**: User interaction simulation
- **ts-jest**: TypeScript support for Jest
- **@apollo/client/testing**: Apollo Client testing utilities

### Configuration

The testing configuration is set up in `jest.config.js` with the following key features:

- TypeScript support with `ts-jest`
- JSX transformation for React components
- Module name mapping for clean imports
- Coverage reporting
- Test file pattern matching

### Test Structure

```
src/
├── test/
│   ├── setup.ts          # Jest setup and global mocks
│   ├── utils.tsx         # Custom render function with Apollo Client
│   ├── mocks.ts          # Mock data and GraphQL responses
│   └── simple.test.ts    # Simple test verification
├── utils/
│   └── __tests__/
│       └── calculations.test.ts
└── components/
    └── __tests__/
        ├── KpiCard.test.tsx
        ├── StatusPill.test.tsx
        ├── Filters.test.tsx
        ├── ProductsTable.test.tsx
        └── Dashboard.test.tsx
```

## Running Tests

### Available Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPatterns=calculations.test.ts

# Run tests matching a pattern
npm test -- --testNamePattern="calculate"
```

### Test Scripts

- `test`: Run all tests once
- `test:watch`: Run tests in watch mode for development
- `test:coverage`: Generate coverage report

## Test Categories

### 1. Utility Function Tests (`src/utils/__tests__/calculations.test.ts`)

Tests for pure functions that perform calculations and data transformations:

- **calculateTotalStock**: Sum of all product stock values
- **calculateTotalDemand**: Sum of all product demand values
- **calculateFillRate**: Percentage of demand that can be fulfilled
- **getProductStatus**: Determine product status (Healthy/Low/Critical)
- **getStatusColor**: Get CSS class for status styling
- **formatNumber**: Format numbers with commas
- **formatPercentage**: Format numbers as percentages

### 2. Component Tests

#### KpiCard Component (`src/components/__tests__/KpiCard.test.tsx`)

Tests for the KPI card display component:

- Renders title and value correctly
- Handles percentage values
- Displays icons when provided
- Shows trend information
- Formats units correctly

#### StatusPill Component (`src/components/__tests__/StatusPill.test.tsx`)

Tests for the status indicator component:

- Renders correct status text
- Applies appropriate CSS classes
- Handles all status types (Healthy, Low, Critical)

#### Filters Component (`src/components/__tests__/Filters.test.tsx`)

Tests for the filtering interface:

- Renders all filter elements
- Handles search input changes
- Manages warehouse dropdown
- Manages status dropdown
- Displays current filter values

#### ProductsTable Component (`src/components/__tests__/ProductsTable.test.tsx`)

Tests for the product data table:

- Renders table headers correctly
- Displays product data
- Handles row clicks
- Shows loading states
- Displays empty states
- Applies status styling
- Handles pagination

#### Dashboard Component (`src/components/__tests__/Dashboard.test.tsx`)

Tests for the main dashboard:

- Renders dashboard header
- Displays date range chips
- Shows KPI cards with correct values
- Renders line chart
- Manages filters
- Displays products table
- Handles user interactions
- Calculates KPIs correctly

## Mock Data

### Mock Products

```typescript
export const mockProducts: Product[] = [
  {
    id: "P-1001",
    name: "12mm Hex Bolt",
    sku: "HEX-12-100",
    warehouse: "BLR-A",
    stock: 180,
    demand: 120
  },
  // ... more products
];
```

### Mock Warehouses

```typescript
export const mockWarehouses: Warehouse[] = [
  {
    code: "BLR-A",
    name: "Bangalore Central",
    city: "Bangalore",
    country: "India"
  },
  // ... more warehouses
];
```

### GraphQL Mock Responses

The project includes mock responses for all GraphQL operations:

- `mockGetProductsResponse`: Products query response
- `mockGetWarehousesResponse`: Warehouses query response
- `mockGetKPIsResponse`: KPIs query response
- `mockUpdateDemandResponse`: Update demand mutation response
- `mockTransferStockResponse`: Transfer stock mutation response

## Testing Utilities

### Custom Render Function

The `src/test/utils.tsx` file provides a custom render function that:

- Wraps components with Apollo Client provider
- Supports GraphQL mocks for testing
- Re-exports React Testing Library utilities

```typescript
import { render, screen, fireEvent, waitFor } from '../test/utils';

// Use with default Apollo Client
render(<MyComponent />);

// Use with GraphQL mocks
render(<MyComponent />, { mocks: [mockGetProductsResponse] });
```

### Test Setup

The `src/test/setup.ts` file configures:

- Jest DOM matchers
- Global mocks for browser APIs
- IntersectionObserver mock
- ResizeObserver mock
- Window matchMedia mock

## Best Practices

### Writing Tests

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test User Interactions**: Use `fireEvent` or `userEvent` to simulate user actions
4. **Async Testing**: Use `waitFor` for asynchronous operations
5. **Mock External Dependencies**: Mock GraphQL operations and external APIs

### Test Organization

1. **Group Related Tests**: Use `describe` blocks to organize related tests
2. **Clear Test Names**: Use descriptive test names that explain the expected behavior
3. **Setup and Teardown**: Use `beforeEach` and `afterEach` for common setup
4. **Isolation**: Each test should be independent and not rely on other tests

### Coverage Goals

- **Utility Functions**: 100% coverage
- **Component Logic**: 90%+ coverage
- **User Interactions**: All critical user flows tested
- **Error Handling**: Error states and edge cases covered

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure `@types/jest` is installed and Jest configuration includes proper TypeScript settings
2. **JSX Errors**: Verify Jest configuration includes JSX transformation
3. **Apollo Client Errors**: Check that GraphQL mocks are properly configured
4. **DOM Matchers**: Ensure `@testing-library/jest-dom` is imported in setup file

### Debugging Tests

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test with debugging
npm test -- --testNamePattern="specific test name" --verbose

# Run tests in watch mode for interactive debugging
npm run test:watch
```

## Future Improvements

1. **Integration Tests**: Add end-to-end tests using Cypress or Playwright
2. **Visual Regression Tests**: Add visual testing for UI components
3. **Performance Tests**: Add performance testing for critical user flows
4. **Accessibility Tests**: Add automated accessibility testing
5. **API Contract Tests**: Add tests to ensure GraphQL schema consistency
