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

  const textElement = screen.getByText(/Don't Miss These Events/i);
  expect(textElement).toBeInTheDocument();
});

test('allows a user to sign in and navigates to the home page', async () => {
  localStorage.clear();

  const fetchMock = jest.spyOn(global, 'fetch');

  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: 'mock-token' }),
  } as Response);

  fetchMock.mockResolvedValueOnce({
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

  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      success: true,
      data: [],
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

    await userEvent.type(usernameInput, 'alice');
    await userEvent.type(passwordInput, 'password123');

    await userEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    await waitFor(() => expect(localStorage.getItem('token')).toBe('mock-token'), { timeout: 5000 });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(3), { timeout: 5000 });
    await waitFor(() => expect(screen.getByText(/Don't Miss These Events/i)).toBeInTheDocument(), { timeout: 5000 });

    expect(fetchMock.mock.calls[0][0]).toBe(`${process.env.REACT_APP_BACKEND_URL}/login`);
    expect(fetchMock.mock.calls[0][1].method).toBe('POST');

  } finally {
    fetchMock.mockRestore();
    alertMock.mockRestore();
  }
});
