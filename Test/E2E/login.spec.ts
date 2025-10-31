import { test, expect } from '@playwright/test';

test.describe('User Login', () => {
  
  test('E2E-001: User login and dashboard access', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input[placeholder="Enter your username"]', 'abc');
    await page.fill('input[placeholder="Enter your password"]', '123456789');
    await page.click('button[type=submit]');
    
    // Wait for navigation after successful login
    await page.waitForURL(/\/(organizers-dashboard|admin-dashboard|\/)/); 
    
    // Verify we're not on signin page anymore
    await expect(page).not.toHaveURL('/signin');
  });

  test('E2E-002: User login Failed', async ({ page }) => {
    await page.goto('/signin');
    await page.fill('input[placeholder="Enter your username"]', 'wrong');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpass');
    await page.click('button[type=submit]');
    
    // Should stay on signin page
    await expect(page).toHaveURL('/signin');
    
    // Check for red error text
    const errorText = page.locator('p.text-red-500');
    await expect(errorText).toBeVisible();
    await expect(errorText).toContainText(/invalid|incorrect|error/i);
  });
});