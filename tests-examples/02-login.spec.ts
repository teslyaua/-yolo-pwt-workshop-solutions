import { test, expect } from "@playwright/test";

test("Admin could login into BO", async ({ page }) => {
  await page.goto("http://p-lab_user-admin.p.testenv.io/users");
  await page.waitForLoadState("networkidle");
  await page.locator("#login_operator_id").selectOption("3");
  await page.getByPlaceholder(" ").click();
  await page.getByPlaceholder(" ").fill("iurii.teslia");
  await page.locator("#login_password").click();
  await page.locator("#login_password").fill("123");
  await page.getByRole("button", { name: "Log in" }).click();

  // expect
  await expect(page.getByText("Customers1").nth(1)).toBeVisible();

  //--------- waitFor
  // await page.getByText("Customers1").nth(1).waitFor()
});
