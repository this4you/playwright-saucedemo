import { test, expect } from "../../src/fixtures/baseTest";

test("route.fulfill: return 500 for CSS (simulate server error)", async ({ page }) => {
    await page.route("**/static/css/*.css", async (route) => {
        await route.fulfill({
            status: 500,
            contentType: "text/plain",
            body: "Mocked 500",
        });
    });

    await page.goto("/inventory.html");

    // Додатково: можна перевірити, що сторінка відкрилась, але стилів може не бути.
    await expect(page).toHaveURL(/inventory\.html/);
});