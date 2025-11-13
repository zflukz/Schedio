// @ts-nocheck
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from './App';

test('Verify page load', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  const textElement = screen.getByText(/Don’t Miss These Events/i);
  expect(textElement).toBeInTheDocument();
});

test('allows a user to sign in and navigates to the home page', async () => {
  const user = userEvent;
  localStorage.clear();

  const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mock-token' }),
    } as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        userID: '1',
        userName: 'Alice',
        firstName: 'Alice',
        lastName: 'Doe',
        userEmail: 'alice@example.com',
        userPhone: '1234567890',
        userRole: 'user',
      }),
    } as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        userID: '1',
        userName: 'Alice',
        firstName: 'Alice',
        lastName: 'Doe',
        userEmail: 'alice@example.com',
        userPhone: '1234567890',
        userRole: 'user',
      }),
    } as Response);

  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  try {
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>
    );

    const usernameInput = await screen.findByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, 'alice');
    await user.type(passwordInput, 'password123');

    await user.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => expect(localStorage.getItem('token')).toBe('mock-token'));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(screen.getByText(/Don’t Miss These Events/i)).toBeInTheDocument());

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${process.env.REACT_APP_BACKEND_URL}/login`,
      expect.objectContaining({
        method: 'POST',
      })
    );
    expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('"userName": "Alice"'));
  } finally {
    fetchMock.mockRestore();
    alertMock.mockRestore();
  }
});