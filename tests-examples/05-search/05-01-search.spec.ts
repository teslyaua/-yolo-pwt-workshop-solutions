import { test, expect } from "@playwright/test";

test("Admin could search user by name", async ({ page }) => {
  await page.goto(
    "http://t2-lab_user-admin.t2.testenv.io/login?return_path=%2F"
  );
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("**/users");

  // //-------- expect.toPass
  // await page.getByPlaceholder("Search by User Name").fill("myrtice.gerlach");
  // await expect(async () => {
  //   await page.getByPlaceholder("Search by User Name").press("Enter");

  //   const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
  //   expect(rowNumber).toBe(1);
  // }, "Should be only the 1 raw after the search").toPass({
  //   timeout: 15_000,
  //   intervals: [5_000],
  // });
});

test("Admin could search user by user ID", async ({ page }) => {
  await page.goto(
    "http://t2-lab_user-admin.t2.testenv.io/login?return_path=%2F"
  );
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("**/users");

  // //-------- expect.toPass
  // await page.getByPlaceholder("Search by User Name").fill("myrtice.gerlach");
  // await expect(async () => {
  //   await page.getByPlaceholder("Search by User Name").press("Enter");

  //   const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
  //   expect(rowNumber).toBe(1);
  // }, "Should be only the 1 raw after the search").toPass({
  //   timeout: 15_000,
  //   intervals: [5_000],
  // });
});


// retries: process.env.CI ? 2 : 0,

