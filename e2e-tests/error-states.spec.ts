import { test, expect } from '@playwright/test';

test.describe('Standard error and fallback states', () => {
  
    test('shows 404 page for missing route', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    // Adjust the text below to match your actual 404 message
    await expect(page.getByText(/not found/i)).toBeVisible();
  });

  test('404 pages shows return home button', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await expect(page.getByRole('link', { name: /Return Home/i })).toBeVisible();
  });

  test('404 pages return home button returns to home page', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await page.getByRole('link', { name: /Return Home/i }).click();
    await expect(page).toHaveURL('/');
  });

  test('shows error message when hero content fails to load', async ({ page }) => {
    await page.route('**/items/hero', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ errors: [{ message: 'Internal Server Error' }] }),
      });
    });
    await page.goto('/');
    await expect(page.getByText(/error loading hero content/i)).toBeVisible();
  });

  test('shows loading state on initial page load', async ({ page }) => {
    await page.route('**/items/hero', async (route) => {
      setTimeout(() => route.continue(), 1500);
    });
    await page.goto('/');
    await expect(page.getByText(/loading hero content/i)).toBeVisible();
  });
}); 