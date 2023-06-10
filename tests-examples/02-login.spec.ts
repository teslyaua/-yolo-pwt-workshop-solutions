import { test, expect } from "@playwright/test";

test("Admin could login into BO", async ({ page }) => {
  await page.goto(
    "http://t2-lab_user-admin.t2.testenv.io/login?return_path=%2F"
  );
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
