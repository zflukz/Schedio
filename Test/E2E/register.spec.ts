import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  
  test('E2E-003: User registration success', async ({ page }, testInfo) => {
    const uniqueEmail = `test-${testInfo.project.name}-${Date.now()}@example.com`;
    
    await page.goto('/register');
    await page.fill('input[placeholder="Your full name"]', 'Test User');
    await page.fill('input[placeholder="you@example.com"]', uniqueEmail);
    await page.fill('input[placeholder="Enter your password"]', 'password123');
    await page.click('button[type=submit]');
    
    // Should redirect to signin page after successful registration
    await expect(page).toHaveURL('/signin');
  });

  test('E2E-004: User registration failed - missing fields', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[placeholder="Your full name"]', '');
    await page.fill('input[placeholder="you@example.com"]', 'test@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'password123');
    await page.click('button[type=submit]');
    
    // Should stay on register page
    await expect(page).toHaveURL('/register');
  });

  test('E2E-005: User registration failed - duplicate email', async ({ page }) => {
    await page.goto('/register');
    await page.fill('input[placeholder="Your full name"]', 'Test User');
    await page.fill('input[placeholder="you@example.com"]', 'existing@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'password123');
    await page.click('button[type=submit]');
    
    // Should stay on register page
    await expect(page).toHaveURL('/register');
    
    });
});