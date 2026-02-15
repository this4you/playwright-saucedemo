import { test, expect } from "../../src/fixtures/baseTest";

test("offline: requests fail in offline mode", async ({ context, page }) => {
    await context.setOffline(true);

    const failures: string[] = [];
    page.on("requestfailed", (r) => {
        failures.push(`${r.method()} ${r.url()} :: ${r.failure()?.errorText}`);
    });

    await page.goto("/inventory.html").catch(() => null);

    expect(failures.length).toBeGreaterThan(0);
    // На лекції можна вивести failures в console.log, щоб було наочно 🙂
});