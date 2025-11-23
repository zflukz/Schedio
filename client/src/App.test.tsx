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
  localStorage.clear();

  // -----------------------------
  // MOCK ALL NETWORK REQUESTS
  // -----------------------------
  const fetchMock = jest.spyOn(global, 'fetch');

  // 1. Login API
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: 'mock-token' }),
  });

  // 2. Refresh user API
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
  });

  // 3. Home page events API
  fetchMock.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      events: [],
    }),
  });

  // -----------------------------
  // OPTIONAL: If your app uses alert()
  // -----------------------------
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

  try {
    // Render Sign In page
    render(
      <MemoryRouter initialEntries={['/signin']}>
        <App />
      </MemoryRouter>
    );

    // Fill username & password
    const usernameInput = await screen.findByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(usernameInput, 'alice');
    await userEvent.type(passwordInput, 'password123');

    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /^sign in$/i }));

    // -----------------------------
    // EXPECT Token Saved
    // -----------------------------
    await waitFor(() =>
      expect(localStorage.getItem('token')).toBe('mock-token')
    );

    // EXPECT correct number of fetch calls
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledTimes(3)
    );

    // EXPECT redirect to homepage
    await waitFor(() =>
      expect(screen.getByText(/Don’t Miss These Events/i)).toBeInTheDocument()
    );

    // EXPECT first call was login API
    expect(fetchMock.mock.calls[0][0]).toBe(
      `${process.env.REACT_APP_BACKEND_URL}/login`
    );

    // EXPECT fetch used POST method
    expect(fetchMock.mock.calls[0][1].method).toBe('POST');

  } finally {
    fetchMock.mockRestore();
    alertMock.mockRestore();
  }
});
