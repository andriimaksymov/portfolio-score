import { test, expect } from '@playwright/test';

test.describe('Analysis Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('validates input requirement', async ({ page }) => {
        const runButton = page.getByRole('button', { name: 'Run Analysis' });
        await expect(runButton).toBeDisabled();

        // Type something
        await page.getByPlaceholder('github.com/your-handle').fill('andriimaksymov');
        await expect(runButton).toBeEnabled();
    });

    test('switches tabs', async ({ page }) => {
        // Use filter to find the correct button among other elements with same text
        await page.getByRole('button').filter({ hasText: 'LinkedIn' }).click();
        await expect(page.getByPlaceholder('linkedin.com/in/your-profile')).toBeVisible();

        await page.getByRole('button').filter({ hasText: 'Resume' }).click();
        await expect(page.getByText('Click to upload Resume (PDF)')).toBeVisible();
    });
});
