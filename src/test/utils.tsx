import React from 'react';
import { render, RenderOptions, screen, fireEvent, waitFor } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { client } from '../apollo/client';

// Custom render function that includes Apollo Client
const AllTheProviders = ({ children, mocks = [] }: { children: React.ReactNode; mocks?: MockedResponse[] }) => {
  if (mocks.length > 0) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );
  }
  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { mocks?: MockedResponse[] }
) => {
  const { mocks, ...renderOptions } = options || {};
  
  return render(ui, {
    wrapper: ({ children }) => <AllTheProviders mocks={mocks}>{children}</AllTheProviders>,
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, screen, fireEvent, waitFor };
