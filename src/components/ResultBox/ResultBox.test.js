import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCases = [
    // PLN -> USD
    { amount: '100', from: 'PLN', to: 'USD', expected: '28.57' },
    { amount: '331', from: 'PLN', to: 'USD', expected: '94.57' },
    { amount: '26', from: 'PLN', to: 'USD', expected: '7.43' },
    { amount: '1234', from: 'PLN', to: 'USD', expected: '352.57' },
    { amount: '3600', from: 'PLN', to: 'USD', expected: '1,028.57' },
    { amount: '4321123', from: 'PLN', to: 'USD', expected: '1,234,606.57' },

    // USD -> PLN
    { amount: '54', from: 'USD', to: 'PLN', expected: '189.00' },
    { amount: '255', from: 'USD', to: 'PLN', expected: '892.50' },
    { amount: '1', from: 'USD', to: 'PLN', expected: '3.50' },
    { amount: '752', from: 'USD', to: 'PLN', expected: '2,632.00' },
    { amount: '5239455', from: 'USD', to: 'PLN', expected: '18,338,092.50' },

    // PLN -> PLN
    { amount: '1', from: 'PLN', to: 'PLN', expected: '1.00' },
    { amount: '1345', from: 'PLN', to: 'PLN', expected: '1,345.00' },

    // USD -> USD
    { amount: '10', from: 'USD', to: 'USD', expected: '10.00' },
    { amount: '54321', from: 'USD', to: 'USD', expected: '54,321.00' },
  ];

  it('should render proper info about conversion', () => {
    for (const testObj of testCases) {
      render(<ResultBox from={testObj.from} to={testObj.to} amount={parseInt(testObj.amount)} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(currSymbol(testObj.from) + space(testObj.from) + amountStr(testObj.amount) + '.00 = ' + currSymbol(testObj.to) + space(testObj.to) + amountStr(testObj.expected));
      cleanup();
    }
  });

  it('should render "Wrong value..." text when amount less than zero', () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent('Wrong value...');
  });
});

const space = currency => {
  if (currency === 'PLN') {
    return ' ';
  }

  return '';
};

const currSymbol = currency => {
  if (currency === 'USD') {
    return '$';
  }

  return currency;
};

const amountStr = amount => {
  // add thousands separator
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};