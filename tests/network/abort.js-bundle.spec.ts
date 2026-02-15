import { test, expect } from "../../src/fixtures/baseTest";

test("route.abort: break JS bundle loading", async ({ page }) => {
    await page.route("**/static/js/*.js", async (route) => {
        await route.abort("failed");
    });

    // Сторінка відкриється, але без JS часто не буде нормального UI
    await page.goto("/inventory.html");

    // Перевіримо, що “апка” не зібралася: наприклад, контейнер inventory не зʼявився
    await expect(page.locator('[data-test="inventory-container"]')).toHaveCount(0);
});