// @ts-nocheck
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from './App';

jest.setTimeout(30000);

beforeEach(() => {
  localStorage.clear();
});

test('Verify page load', async () => {
  const fetchMock = jest.spyOn(global, 'fetch');
  
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, data: [] }),
  } as Response);

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  const textElement = await screen.findByText(/Miss These Events/i, {}, { timeout: 10000 });
  
  expect(textElement).toBeInTheDocument();
  
  fetchMock.mockRestore();
});

test('allows a user to sign in', async () => {
  const fetchMock = jest.spyOn(global, 'fetch');

  fetchMock.mockImplementation((url) => {
    if (url.includes('/login')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({ token: 'mock-token' }),
      } as Response);
    }
    return Promise.resolve({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);
  });

  render(
    <MemoryRouter initialEntries={['/signin']}>
      <App />
    </MemoryRouter>
  );

  const usernameInput = await screen.findByLabelText(/username/i, {}, { timeout: 5000 });
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(usernameInput, 'alice');
  await userEvent.type(passwordInput, 'password123');

  const signInButton = screen.getByRole('button', { name: /^sign in$/i });
  await userEvent.click(signInButton);

  await waitFor(() => {
    expect(localStorage.getItem('token')).toBe('mock-token');
  }, { timeout: 10000 });

  fetchMock.mockRestore();
});
