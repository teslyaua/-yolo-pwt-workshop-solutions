import { test, expect } from "@playwright/test";
import { TableHelper } from "./table-helper";

test("Admin could user status", async ({ page }) => {
  await test.step(`STEP-1: Open Login page`, async () => {
    await page.goto(
      "http://p-lab_user-admin.p.testenv.io/login?return_path=%2F"
    );
    await page.waitForLoadState("networkidle");
  });

  const userName = "iurii.teslia";
  await test.step(`STEP-2: Login as ${userName}`, async () => {
    await page.locator("#login_operator_id").selectOption("ygf");
    await page.getByPlaceholder(" ").fill(userName);
    await page.locator("#login_password").fill("123");
    await page.getByRole("button", { name: "Log in" }).click();
  });

  await test.step(`STEP-3: Search for a user by email username_myrtice.gerlach1@hi.com`, async () => {
    await page
      .getByPlaceholder("Search by email or %email%")
      .fill("username_myrtice.gerlach@hi.com");
    await expect(async () => {
      await page.getByPlaceholder("Search by email or %email%").press("Enter");
      const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
      expect(rowNumber).toBe(1);
    }, "Should be only the 1 raw after the search").toPass({
      timeout: 15_000,
      intervals: [5_000],
    });
  });

  const tableHelper = new TableHelper(page, "#customers-table");
  const status = await test.step(`STEP-4: Get user status `, async () => {
    return await tableHelper.getCellTextByHeaderValue("Status", {
      rowHasText: "username_myrtice.gerlach@hi.com",
    });
  });
  await expect(status, "Status should be active").toBe("ACTIVE");
});
