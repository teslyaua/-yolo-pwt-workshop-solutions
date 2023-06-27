import { test, expect } from "@playwright/test";

test("Admin could search user by name", async ({ page }) => {
  await page.goto("http://p-lab_user-admin.p.testenv.io/login?return_path=%2F");
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();
  await page.waitForURL("**/users");

  //-------- expect.toPass
  await page.getByPlaceholder("Search by User Name").fill("myrtice.gerlach");
  await expect(async () => {
    await page.getByPlaceholder("Search by User Name").press("Enter");

    const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
    expect(rowNumber).toBe(1);
  }, "Should be only the 1 raw after the search").toPass({
    timeout: 15_000,
    intervals: [5_000],
  });
});

test("Admin could search user by user ID", async ({ page }) => {
  await page.goto("http://p-lab_user-admin.p.testenv.io/login?return_path=%2F");
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();

  await page.getByPlaceholder("Search by User ID").fill("178717");
  await expect(async () => {
    await page.getByPlaceholder("Search by User ID").press("Enter");

    const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
    expect(rowNumber).toBe(1);
  }, "Should be only the 1 raw after the search").toPass({
    timeout: 15_000,
    intervals: [5_000],
  });
});

test("Admin could search user by user email", async ({ page }) => {
  await page.goto("http://p-lab_user-admin.p.testenv.io/login?return_path=%2F");
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();

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

// -------- steps

// test("Admin could search user by user email [steps] ", async ({ page }) => {
//   await test.step(`STEP-1: Open Login page`, async () => {
//     await page.goto(
//       "http://p-lab_user-admin.p.testenv.io/login?return_path=%2F"
//     );
//   });

//   const userName = "iurii.teslia";
//   await test.step(`STEP-2: Login as ${userName}`, async () => {
//     await page.locator("#login_operator_id").selectOption("ygf");

//     await page.getByPlaceholder(" ").fill(userName);
//     await page.locator("#login_password").fill("123");
//     await page.getByRole("button", { name: "Log in" }).click();
//   });

//   await test.step(`STEP-3: Search for a user by email username_myrtice.gerlach1@hi.com`, async () => {
//     await page
//       .getByPlaceholder("Search by email or %email%")
//       .fill("username_myrtice.gerlach@hi.com");
//     await expect(async () => {
//       await page.getByPlaceholder("Search by email or %email%").press("Enter");

//       const rowNumber = await page.locator("tr:has-text('hi_casino')").count();
//       expect(rowNumber).toBe(1);
//     }, "Should be only the 1 raw after the search").toPass({
//       timeout: 15_000,
//       intervals: [5_000],
//     });
//   });
// });
