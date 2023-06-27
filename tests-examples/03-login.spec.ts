import { test, expect } from "@playwright/test";

test("Admin could login into BO", async ({ page }) => {
  await page.goto("http://p-lab_user-admin.p.testenv.io/login?return_path=%2F");
  await page.locator("#login_operator_id").selectOption("ygf");

  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();

  //--------- Custom assertion messages
  await expect(
    page.getByText("Customers1").nth(1),
    "Customers label should be visible"
  ).toBeVisible();

  // //---------- Configurable timeouts
  // await expect(
  //   page.getByText("Customers1").nth(1),
  //   "Customers label should be visible"
  // ).toBeVisible({ timeout: 10_000 });

  // //------------- Soft asserts
  // await expect.soft(
  //   page.getByText("Customers1").nth(1),
  //   "Customers label should be visible"
  // ).toBeVisible();

  await expect
    .soft(page.getByText("Pages • 8"), "Label 'Pages • 8' should be visible")
    .toBeVisible();

  await expect(
    page.getByTestId("users-page"),
    "Customers label should be visible"
  ).toContainText("iurii.teslia1");
});

// // Expect Options
//   expect: {timeout: 10*1000},
