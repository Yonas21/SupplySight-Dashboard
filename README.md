# SupplySight - Supply Chain Dashboard

A modern React + TypeScript + Tailwind CSS application for supply chain management with a mock GraphQL server.

## Features

- **Real-time Dashboard**: Monitor stock levels, demand, and fill rates
- **Interactive Charts**: Visualize stock vs demand trends over time
- **Product Management**: View and manage products across multiple warehouses
- **Advanced Filtering**: Search by product name, SKU, warehouse, and status
- **Stock Operations**: Update demand and transfer stock between warehouses
- **Responsive Design**: Modern UI that works on all devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **GraphQL**: Apollo Client + Apollo Server
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Express.js with mock GraphQL server

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-graphql
```

2. Install dependencies:
```bash
npm install
```

3. Start the development servers:
```bash
npm run dev:full
```

This will start both:
- GraphQL server on `http://localhost:4000`
- React development server on `http://localhost:5173`

### Alternative Commands

- Start only the React app: `npm run dev`
- Start only the GraphQL server: `npm run server`
- Build for production: `npm run build`

## Testing

The project includes comprehensive testing with Jest, React Testing Library, and Apollo Client testing utilities.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPatterns=calculations.test.ts
```

### Test Coverage

- **Utility Functions**: 100% coverage for calculation and formatting functions
- **Component Tests**: Tests for all major components including user interactions
- **GraphQL Integration**: Mocked GraphQL operations for testing data flow
- **User Interactions**: Tests for filtering, pagination, and form submissions

For detailed testing documentation, see [TESTING.md](./TESTING.md).

## Project Structure

```
src/
├── apollo/           # Apollo Client configuration
├── components/       # React components
├── graphql/         # GraphQL queries and mutations
├── server/          # Mock GraphQL server
├── types/           # TypeScript interfaces
├── utils/           # Utility functions
└── App.tsx          # Main application component
```

## GraphQL Schema

The application implements the following GraphQL schema:

```graphql
type Warehouse {
  code: ID!
  name: String!
  city: String!
  country: String!
}

type Product {
  id: ID!
  name: String!
  sku: String!
  warehouse: String!
  stock: Int!
  demand: Int!
}

type KPI {
  date: String!
  stock: Int!
  demand: Int!
}

type Query {
  products(search: String, status: String, warehouse: String): [Product!]
  warehouses: [Warehouse!]
  kpis(range: String!): [KPI!]
}

type Mutation {
  updateDemand(id: ID!, demand: Int!): Product!
  transferStock(id: ID!, from: String!, to: String!, qty: Int!): Product!
}
```

## Key Components

### Dashboard
The main dashboard component that orchestrates all other components and manages application state.

### KPI Cards
Display key metrics:
- Total Stock: Sum of all product stock levels
- Total Demand: Sum of all product demand
- Fill Rate: Percentage of demand that can be met with current stock

### Line Chart
Interactive chart showing stock vs demand trends over time with configurable date ranges (7d, 14d, 30d).

### Products Table
- Displays products with pagination (10 items per page)
- Status indicators (Healthy, Low, Critical)
- Row highlighting for critical items
- Click to open detailed side drawer

### Filters
- Search by product name, SKU, or ID
- Filter by warehouse
- Filter by status (All, Healthy, Low, Critical)

### Side Drawer
Opens when clicking a product row, providing:
- Product details
- Update demand form
- Transfer stock form

## Data

The application uses mock data including:
- 12 sample products with realistic stock and demand values
- 5 warehouses across India
- Generated KPI data for trend visualization

## Status Logic

Products are categorized by status based on stock vs demand:
- **Healthy**: stock > demand
- **Low**: stock == demand  
- **Critical**: stock < demand

## Development

### Adding New Features

1. Define TypeScript interfaces in `src/types/`
2. Add GraphQL queries/mutations in `src/graphql/`
3. Create React components in `src/components/`
4. Update the mock server data and resolvers as needed

### Styling

The application uses Tailwind CSS with custom component classes defined in `src/index.css`.

### State Management

The application uses React hooks for local state management and Apollo Client for server state management.

## License

MIT License
